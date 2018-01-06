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

export const search = queries => {
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

export const search$ = function() {
  return Observable.from(search(...arguments))
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

export const setFact = ([subject, predicate, object], notify = true) => {
  return search([[subject, predicate, ["someObject"]]]).then(results => {
    const factsToRemove = results.map(({ someObject }) => [
      subject,
      predicate,
      someObject
    ])
    return update([[subject, predicate, object]], factsToRemove, notify)
  })
}

export const setFact$ = function() {
  return Observable.from(setFact(...arguments))
}

export const watchAll$ = query => {
  return store$
    .startWith(true)
    .concatMap(() => {
      return search$(query)
    })
    .distinctUntilChanged((a, b) => {
      return equals(a, b)
    })
}

export const watchEach$ = query => {
  return store$
    .startWith(true)
    .concatMap(() => {
      return search$(query)
    })
    .mergeAll()
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

export const update = (factsToAdd, factsToDelete, notify = true) => {
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

export const update$ = function() {
  return Observable.from(update(...arguments))
}
