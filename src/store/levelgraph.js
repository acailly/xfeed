import {is, cond, T} from 'ramda'
import memdb from 'memdb'
import levelgraph from 'levelgraph'

const db = levelgraph(memdb())

export const addFact = ([subject, predicate, object]) => {
  return new Promise((resolve, reject) => {
    db.put({subject, predicate, object}, err => {
      if (err) reject(err)
      resolve()
    })
  })
}

const toLevelGraphValue = cond([
  [is(Array), v => db.v(v[0])],
  [T, v => v]
])

export const find = queries => {
  const levelgraphQueries = queries.map(([s, p, o]) => {
    const subject = toLevelGraphValue(s)
    const predicate = toLevelGraphValue(p)
    const object = toLevelGraphValue(o)

    return {subject, predicate, object}
  })

  return new Promise((resolve, reject) => {
    db.search(levelgraphQueries, (err, results) => {
      if (err) reject(err)
      resolve(results)
    })
  })
}
