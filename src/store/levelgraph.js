import { is, cond, T } from "ramda"
import memdb from "memdb"
import levelgraph from "levelgraph"

const options = {
  // https://github.com/levelgraph/levelgraph/issues/127
  joinAlgorithm: "basic"
}

const db = levelgraph(memdb(), options)

export const addFact = ([subject, predicate, object]) => {
  return new Promise((resolve, reject) => {
    db.put({ subject, predicate, object }, err => {
      if (err) reject(err)
      resolve()
    })
  })
}

const toLevelGraphValue = cond([[is(Array), v => db.v(v[0])], [T, v => v]])

//TODO Renvoyer des streams rxjs plutot que des promesses

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
