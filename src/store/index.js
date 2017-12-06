import Hexastore from 'hexastore'

const facts = new Hexastore()

const addFact = fact => facts.put(fact)

const find = queries => facts.search(queries)

export default {
  addFact,
  find
}
