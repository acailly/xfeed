import Hexastore from 'hexastore'

const facts = new Hexastore()

export const addFact = fact => Promise.resolve(facts.put(fact))

export const find = queries => Promise.resolve(facts.search(queries))