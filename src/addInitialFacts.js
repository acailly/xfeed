import store from "./store"
import "./rules"

//DEBUG
window.search = v => store.search(v).then(r => console.log(r))

export default () => {
  return Promise.all([
    //TYPES - DEBUT DE CONTRAT
    store.addFact(["debutContrat", "icon", "fiber_new"]),

    //TYPES - PAIE
    store.addFact(["paie", "render", "PaieWidget"]),
    store.addFact(["paie", "icon", "monetization_on"]),

    //TYPES - PAIE - COTISATIONS
    store.addFact(["paie", "cotisation", "#vieillesseMaladie"]),
    store.addFact([
      "#vieillesseMaladie",
      "name",
      "SECURITE SOCIALE - Vieillesse et maladie"
    ]),
    store.addFact(["#vieillesseMaladie", "base", 100]),
    store.addFact(["#vieillesseMaladie", "rate", 8.05]),

    store.addFact(["paie", "cotisation", "#retraiteComplementaire"]),
    store.addFact([
      "#retraiteComplementaire",
      "name",
      "IRCEM RETRAITE COMPLEMENTAIRE"
    ]),
    store.addFact(["#retraiteComplementaire", "base", 100]),
    store.addFact(["#retraiteComplementaire", "rate", 3.1]),

    store.addFact(["paie", "cotisation", "#chomage"]),
    store.addFact(["#chomage", "name", "CHOMAGE"]),
    store.addFact(["#chomage", "base", 100]),
    store.addFact(["#chomage", "rate", 2.4]),

    store.addFact(["paie", "cotisation", "#prevoyanceAGFF"]),
    store.addFact([
      "#prevoyanceAGFF",
      "name",
      "IRCEM PREVOYANCE  + AGFF (0,8%)"
    ]),
    store.addFact(["#prevoyanceAGFF", "base", 100]),
    store.addFact(["#prevoyanceAGFF", "rate", 1.95]),

    store.addFact(["paie", "cotisation", "#csgDeductible"]),
    store.addFact(["#csgDeductible", "name", "CSG DEDUCTIBLE"]),
    store.addFact(["#csgDeductible", "base", 98.25]),
    store.addFact(["#csgDeductible", "rate", 5.1]),

    store.addFact(["paie", "cotisation", "#csgRdsNonDeductible"]),
    store.addFact([
      "#csgRdsNonDeductible",
      "name",
      "CSG + RDS PART NON DEDUCTIBLE (2,4% et 0,50%)"
    ]),
    store.addFact(["#csgRdsNonDeductible", "base", 98.25]),
    store.addFact(["#csgRdsNonDeductible", "rate", 2.9]),

    //PROJET ASSISTANTE MATERNELLE
    store.addFact(["#projetAssMat", "is", "project"]),
    store.addFact(["#projetAssMat", "name", "Assistante maternelle"]),

    //PROJET ASSISTANTE MATERNELLE - DEBUT DE CONTRAT
    store.addFact(["#projetAssMat", "contains", "#debutContrat"]),
    store.addFact(["#debutContrat", "is", "debutContrat"]),
    store.addFact(["#debutContrat", "name", "Début du contrat"]),
    store.addFact(["#debutContrat", "created", "20171001"]),
    store.addFact(["#debutContrat", "createdFormatted", "01/10/2017"]),

    //PROJET ASSISTANTE MATERNELLE - PAIE OCTOBRE
    store.addFact(["#projetAssMat", "contains", "#paieOctobre"]),
    store.addFact(["#paieOctobre", "is", "paie"]),
    store.addFact(["#paieOctobre", "name", `Paie d'Octobre`]),
    store.addFact(["#paieOctobre", "created", "20171101"]),
    store.addFact(["#paieOctobre", "createdFormatted", "01/11/2017"]),
    store.addFact(["#paieOctobre", "workingHours", 115]),
    store.addFact(["#paieOctobre", "workingDays", 16]),
    store.addFact(["#paieOctobre", "hourlyGrossRate", 3.77]),

    //PROJET ASSISTANTE MATERNELLE - PAIE NOVEMBRE
    store.addFact(["#projetAssMat", "contains", "#paieNovembre"]),
    store.addFact(["#paieNovembre", "is", "paie"]),
    store.addFact(["#paieNovembre", "name", `Paie de Novembre`]),
    store.addFact(["#paieNovembre", "created", "20171201"]),
    store.addFact(["#paieNovembre", "createdFormatted", "01/12/2017"]),

    //PROJET ASSISTANTE MATERNELLE - PAIE DECEMBRE
    store.addFact(["#projetAssMat", "contains", "#paieDecembre"]),
    store.addFact(["#paieDecembre", "is", "paie"]),
    store.addFact(["#paieDecembre", "name", `Paie de Décembre`]),
    store.addFact(["#paieDecembre", "created", "20180101"]),
    store.addFact(["#paieDecembre", "createdFormatted", "01/01/2018"])
  ]).catch(err => console.error(err))
}
