import store from "./store"

export default () => {
  return Promise.all([
    store.addFact(["#1", "is", "project"]),
    store.addFact(["#1", "name", "Assistante maternelle"]),

    store.addFact(["#1", "contains", "#2"]),
    store.addFact(["#2", "name", "Début du contrat"]),
    store.addFact(["#2", "created", "01/10/2017"]),
    store.addFact(["#2", "icon", "fiber_new"]),

    store.addFact(["#1", "contains", "#3"]),
    store.addFact(["#3", "is", "paie"]),
    store.addFact(["#3", "name", `Paie d'Octobre`]),
    store.addFact(["#3", "created", "01/11/2017"]),
    store.addFact(["#3", "icon", "monetization_on"]),

    store.addFact(["#1", "contains", "#4"]),
    store.addFact(["#4", "is", "paie"]),
    store.addFact(["#4", "name", `Paie de Novembre`]),
    store.addFact(["#4", "created", "01/12/2017"]),
    store.addFact(["#4", "icon", "monetization_on"]),

    store.addFact(["#1", "contains", "#5"]),
    store.addFact(["#5", "is", "paie"]),
    store.addFact(["#5", "name", `Paie de Décembre`]),
    store.addFact(["#5", "created", "01/01/2018"]),
    store.addFact(["#5", "icon", "monetization_on"]),

    store.addFact(["paie", "render", "PaieWidget"]),
    store.addFact(["#11", "is", "paie"]),
    store.addFact(["#11", "mois", "octobre"]),
    store.addFact(["#11", "salaire", "12€"])
  ]).catch(err => console.error(err))
}
