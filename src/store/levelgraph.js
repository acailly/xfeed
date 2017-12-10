import {is, cond, T, propEq, find} from 'ramda'
import memdb from 'memdb'
import levelgraph from 'levelgraph'

const db = levelgraph(memdb())

export const addFact = ([subject, predicate, object, factId]) => {
  return new Promise((resolve, reject) => {
    db.put({subject, predicate, object, factId}, err => {
      if (err) reject(err)
      resolve()
    })
  })
}

const toLevelGraphValue = cond([
  [is(Array), v => db.v(v[0])],
  [T, v => v]
])

export const search = queries => {
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

export const getFact = factId => {
  return new Promise((resolve, reject) => {
    db.get({}, (err, results) => {
      if (err) reject(err)
      resolve(find(propEq('factId', factId), results))
    })
  })
}
