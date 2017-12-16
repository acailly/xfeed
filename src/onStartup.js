import store from "./store"

export default () => {
  return Promise.all([
    store.addFact(["debutContrat", "icon", "fiber_new"]),

    store.addFact(["paie", "render", "PaieWidget"]),
    store.addFact(["paie", "icon", "monetization_on"]),

    store.addFact(["#projetAssMat", "is", "project"]),
    store.addFact(["#projetAssMat", "name", "Assistante maternelle"]),

    store.addFact(["#projetAssMat", "contains", "#debutContrat"]),
    store.addFact(["#debutContrat", "is", "debutContrat"]),
    store.addFact(["#debutContrat", "name", "Début du contrat"]),
    store.addFact(["#debutContrat", "created", "20171001"]),
    store.addFact(["#debutContrat", "createdFormatted", "01/10/2017"]),

    store.addFact(["#projetAssMat", "contains", "#paieOctobre"]),
    store.addFact(["#paieOctobre", "is", "paie"]),
    store.addFact(["#paieOctobre", "name", `Paie d'Octobre`]),
    store.addFact(["#paieOctobre", "created", "20171101"]),
    store.addFact(["#paieOctobre", "createdFormatted", "01/11/2017"]),
    store.addFact(["#paieOctobre", "month", "octobre"]),
    store.addFact(["#paieOctobre", "salary", "12€"]),

    store.addFact(["#projetAssMat", "contains", "#paieNovembre"]),
    store.addFact(["#paieNovembre", "is", "paie"]),
    store.addFact(["#paieNovembre", "name", `Paie de Novembre`]),
    store.addFact(["#paieNovembre", "created", "20171201"]),
    store.addFact(["#paieNovembre", "createdFormatted", "01/12/2017"]),

    store.addFact(["#projetAssMat", "contains", "#paieDecembre"]),
    store.addFact(["#paieDecembre", "is", "paie"]),
    store.addFact(["#paieDecembre", "name", `Paie de Décembre`]),
    store.addFact(["#paieDecembre", "created", "20180101"]),
    store.addFact(["#paieDecembre", "createdFormatted", "01/01/2018"])
  ]).catch(err => console.error(err))
}
