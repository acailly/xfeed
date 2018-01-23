import store from "./store"

import facts from "./facts"

//TODO ACY Essayer de parser du vrai texte sans les [] et les ,

const initialFacts = [...facts]

export default () =>
  Promise.all(
    initialFacts.map(initialFact => store.addFact(initialFact))
  ).catch(err => console.error(err))
