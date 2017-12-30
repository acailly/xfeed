//https://github.com/levelgraph/levelgraph

import { is, cond, T, equals, flatten, head } from "ramda"
import memdb from "memdb"
import levelgraph from "levelgraph"
import { Observable } from "rxjs/Observable"
import { Subject } from "rxjs/Subject"

const options = {
  // https://github.com/levelgraph/levelgraph/issues/127
  joinAlgorithm: "basic"
}

const innerdb = memdb()
const db = levelgraph(innerdb, options)

const toLevelGraphValue = cond([[is(Array), v => db.v(v[0])], [T, v => v]])

export const searchFacts = queries => {
  const levelgraphQueries = queries.map(([s, p, o]) => {
    const subject = toLevelGraphValue(s)
    const predicate = toLevelGraphValue(p)
    const object = toLevelGraphValue(o)

    return { subject, predicate, object }
  })

  return new Promise((resolve, reject) => {
    db.search(levelgraphQueries, (err, results) => {
      if (err) reject(err)
      resolve(results)
    })
  })
}

export const searchFacts$ = function() {
  return Observable.from(searchFacts(...arguments))
}

export const searchSingleFact = queries => {
  return searchFacts(queries).then(results => {
    if (results.length > 1)
      console.warn(
        "Expected single fact but have multiple facts for queries",
        queries,
        results
      )
    return head(results)
  })
}

export const searchSingleFact$ = function() {
  return Observable.from(searchSingleFact(...arguments))
}

const store$ = new Subject()

export const changed$ = () => store$.asObservable()

export const notifyAll = () => store$.next(true)

export const addFact = ([subject, predicate, object], notify = true) => {
  return new Promise((resolve, reject) => {
    db.put({ subject, predicate, object }, err => {
      if (err) {
        console.error(err)
        reject(err)
      }
      // console.log("DEBUG", "ADD", subject, predicate, object)
      if (notify) notifyAll()
      resolve(true)
    })
  })
}

export const addFact$ = function() {
  return Observable.from(addFact(...arguments))
}

export const addSingleFact = ([subject, predicate, object], notify = true) => {
  return searchFacts([[subject, predicate, ["someObject"]]]).then(results => {
    const factsToRemove = results.map(({ someObject }) => [
      subject,
      predicate,
      someObject
    ])
    return transaction([[subject, predicate, object]], factsToRemove, notify)
  })
}

export const addSingleFact$ = function() {
  return Observable.from(addSingleFact(...arguments))
}

export const watchFacts$ = query => {
  return store$
    .startWith(true)
    .concatMap(() => {
      return searchFacts$(query)
    })
    .distinctUntilChanged((a, b) => {
      return equals(a, b)
    })
}

export const watchSingleFact$ = query => {
  return store$
    .startWith(true)
    .concatMap(() => {
      return searchSingleFact$(query)
    })
    .distinctUntilChanged((a, b) => {
      return equals(a, b)
    })
}

export const deleteFact = ([subject, predicate, object], notify = true) => {
  return new Promise((resolve, reject) => {
    db.del({ subject, predicate, object }, err => {
      if (err) {
        console.error(err)
        reject(err)
      }
      // console.log("DEBUG", "DELETE", subject, predicate, object)
      if (notify) notifyAll()
      resolve(true)
    })
  })
}

export const deleteFact$ = function() {
  return Observable.from(deleteFact(...arguments))
}

export const transaction = (factsToAdd, factsToDelete, notify = true) => {
  const batches = flatten([
    factsToDelete.map(([subject, predicate, object]) => {
      return db.generateBatch({ subject, predicate, object }, "del")
    }),
    factsToAdd.map(([subject, predicate, object]) => {
      return db.generateBatch({ subject, predicate, object }, "put")
    })
  ])

  return new Promise((resolve, reject) => {
    innerdb.batch(batches, err => {
      if (err) {
        console.error(err)
        reject(err)
      }
      if (notify) notifyAll()
      resolve(true)
    })
  })
}

export const transaction$ = function() {
  return Observable.from(transaction(...arguments))
}
