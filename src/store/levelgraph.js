//https://github.com/levelgraph/levelgraph

import { is, cond, T, equals } from "ramda"
import memdb from "memdb"
import levelgraph from "levelgraph"
import { Observable } from "rxjs/Observable"
import { Subject } from "rxjs/Subject"

const options = {
  // https://github.com/levelgraph/levelgraph/issues/127
  joinAlgorithm: "basic"
}

const db = levelgraph(memdb(), options)

const toLevelGraphValue = cond([[is(Array), v => db.v(v[0])], [T, v => v]])

//TODO Renvoyer des streams rxjs plutot que des promesses

export const search = queries => {
  const levelgraphQueries = queries.map(([s, p, o]) => {
    const subject = toLevelGraphValue(s)
    const predicate = toLevelGraphValue(p)
    const object = toLevelGraphValue(o)

    return { subject, predicate, object }
  })

  return Observable.from(
    new Promise((resolve, reject) => {
      db.search(levelgraphQueries, (err, results) => {
        if (err) reject(err)
        resolve(results)
      })
    })
  )
}

const store$ = new Subject()

export const addFact = ([subject, predicate, object]) => {
  return Observable.from(
    new Promise((resolve, reject) => {
      db.put({ subject, predicate, object }, err => {
        if (err) reject(err)
        store$.next(true)
        resolve(true)
      })
    })
  )
}

export const watch = query => {
  return store$
    .map(v => {
      return v
    })
    .concatMap(() => {
      return search(query)
    })
    .distinctUntilChanged((a, b) => {
      return equals(a, b)
    })
}
