import store from "./store"

const initialFacts = [
  //TYPES - DEBUT DE CONTRAT
  ["debutContrat", "icon", "fiber_new"],

  //TYPES - PAIE
  ["paie", "render", "PaieWidget.md"],
  ["paie", "icon", "monetization_on"],

  //TYPES - PAIE - COTISATIONS
  ["paie", "cotisation", "vieillesseMaladie"],
  ["vieillesseMaladie", "name", "SECURITE SOCIALE - Vieillesse et maladie"],
  ["vieillesseMaladie", "base", 100],
  ["vieillesseMaladie", "rate", 8.05],

  ["paie", "cotisation", "retraiteComplementaire"],
  ["retraiteComplementaire", "name", "IRCEM RETRAITE COMPLEMENTAIRE"],
  ["retraiteComplementaire", "base", 100],
  ["retraiteComplementaire", "rate", 3.1],

  ["paie", "cotisation", "chomage"],
  ["chomage", "name", "CHOMAGE"],
  ["chomage", "base", 100],
  ["chomage", "rate", 2.4],

  ["paie", "cotisation", "prevoyanceAGFF"],
  ["prevoyanceAGFF", "name", "IRCEM PREVOYANCE  + AGFF (0,8%)"],
  ["prevoyanceAGFF", "base", 100],
  ["prevoyanceAGFF", "rate", 1.95],

  ["paie", "cotisation", "csgDeductible"],
  ["csgDeductible", "name", "CSG DEDUCTIBLE"],
  ["csgDeductible", "base", 98.25],
  ["csgDeductible", "rate", 5.1],

  ["paie", "cotisation", "csgRdsNonDeductible"],
  [
    "csgRdsNonDeductible",
    "name",
    "CSG + RDS PART NON DEDUCTIBLE (2,4% et 0,50%)"
  ],
  ["csgRdsNonDeductible", "base", 98.25],
  ["csgRdsNonDeductible", "rate", 2.9],

  //PROJET ASSISTANTE MATERNELLE
  ["projetAssMat", "is", "project"],
  ["projetAssMat", "name", "Assistante maternelle"],

  //PROJET ASSISTANTE MATERNELLE - DEBUT DE CONTRAT
  ["projetAssMat", "contains", "debutContrat"],
  ["debutContrat", "is", "debutContrat"],
  ["debutContrat", "name", "Début du contrat"],
  ["debutContrat", "created", "20171001"],
  ["debutContrat", "createdFormatted", "01/10/2017"],

  //PROJET ASSISTANTE MATERNELLE - PAIE OCTOBRE
  ["projetAssMat", "contains", "paieOctobre"],
  ["paieOctobre", "is", "paie"],
  ["paieOctobre", "name", `Paie d'Octobre`],
  ["paieOctobre", "created", "20171101"],
  ["paieOctobre", "createdFormatted", "01/11/2017"],
  ["paieOctobre", "workingHours", 115],
  ["paieOctobre", "workingDays", 16],
  ["paieOctobre", "hourlyGrossRate", 3.77],

  //PROJET ASSISTANTE MATERNELLE - PAIE NOVEMBRE
  ["projetAssMat", "contains", "paieNovembre"],
  ["paieNovembre", "is", "paie"],
  ["paieNovembre", "name", `Paie de Novembre`],
  ["paieNovembre", "created", "20171201"],
  ["paieNovembre", "createdFormatted", "01/12/2017"],

  //PROJET ASSISTANTE MATERNELLE - PAIE DECEMBRE
  ["projetAssMat", "contains", "paieDecembre"],
  ["paieDecembre", "is", "paie"],
  ["paieDecembre", "name", `Paie de Décembre`],
  ["paieDecembre", "created", "20180101"],
  ["paieDecembre", "createdFormatted", "01/01/2018"],

  //SELECTION
  ["projetAssMat", "selection", "paieOctobre"]
]

export default () =>
  Promise.all(
    initialFacts.map(initialFact => store.addFact(initialFact))
  ).catch(err => console.error(err))
