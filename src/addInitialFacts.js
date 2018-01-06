import store from "./store"

//TODO ACY Essayer de parser du vrai texte sans les [] et les ,

const initialFacts = [
  //TYPES - DEBUT DE CONTRAT
  ["un début de contrat", "a pour icône", "fiber_new"],

  //TYPES - PAIE
  ["une paie", "s'affiche avec", "PaieWidget.md"],
  ["une paie", "a pour icône", "monetization_on"],

  //TYPES - PAIE - COTISATIONS
  ["une paie", "est sujette à", "la cotisation vieillesse maladie"],
  [
    "la cotisation vieillesse maladie",
    "a pour nom",
    "SECURITE SOCIALE - Vieillesse et maladie"
  ],
  ["la cotisation vieillesse maladie", "a pour base", 100],
  ["la cotisation vieillesse maladie", "a pour taux", 8.05],

  ["une paie", "est sujette à", "la cotisation retraite complementaire"],
  [
    "la cotisation retraite complementaire",
    "a pour nom",
    "IRCEM RETRAITE COMPLEMENTAIRE"
  ],
  ["la cotisation retraite complementaire", "a pour base", 100],
  ["la cotisation retraite complementaire", "a pour taux", 3.1],

  ["une paie", "est sujette à", "la cotisation chomage"],
  ["la cotisation chomage", "a pour nom", "CHOMAGE"],
  ["la cotisation chomage", "a pour base", 100],
  ["la cotisation chomage", "a pour taux", 2.4],

  ["une paie", "est sujette à", "la cotisation prevoyance AGFF"],
  [
    "la cotisation prevoyance AGFF",
    "a pour nom",
    "IRCEM PREVOYANCE  + AGFF (0,8%)"
  ],
  ["la cotisation prevoyance AGFF", "a pour base", 100],
  ["la cotisation prevoyance AGFF", "a pour taux", 1.95],

  ["une paie", "est sujette à", "la cotisation CSG déductible"],
  ["la cotisation CSG déductible", "a pour nom", "CSG DEDUCTIBLE"],
  ["la cotisation CSG déductible", "a pour base", 98.25],
  ["la cotisation CSG déductible", "a pour taux", 5.1],

  ["une paie", "est sujette à", "la cotisation CSG+RDS non déductible"],
  [
    "la cotisation CSG+RDS non déductible",
    "a pour nom",
    "CSG + RDS PART NON DEDUCTIBLE (2,4% et 0,50%)"
  ],
  ["la cotisation CSG+RDS non déductible", "a pour base", 98.25],
  ["la cotisation CSG+RDS non déductible", "a pour taux", 2.9],

  //PROJET ASSISTANTE MATERNELLE
  ["le projet assistante maternelle", "est", "un projet"],
  ["le projet assistante maternelle", "a pour nom", "Assistante maternelle"],

  //PROJET ASSISTANTE MATERNELLE - DEBUT DE CONTRAT
  ["le projet assistante maternelle", "contient", "le début de contrat"],
  ["le début de contrat", "est", "un début de contrat"],
  ["le début de contrat", "a pour nom", "Début du contrat"],
  ["le début de contrat", "a pour date de création", "20171001"],
  ["le début de contrat", "a pour date de création (formatté)", "01/10/2017"],

  //PROJET ASSISTANTE MATERNELLE - PAIE OCTOBRE
  ["le projet assistante maternelle", "contient", "la paie d'octobre"],
  ["la paie d'octobre", "est", "une paie"],
  ["la paie d'octobre", "a pour nom", "Paie d'Octobre"],
  ["la paie d'octobre", "a pour date de création", "20171101"],
  ["la paie d'octobre", "a pour date de création (formatté)", "01/11/2017"],
  ["la paie d'octobre", "a pour nombre d'heures travaillées", 115],
  ["la paie d'octobre", "a pour nombre de jours travaillés", 16],
  ["la paie d'octobre", "a pour taux horaire brut", 3.77],

  //PROJET ASSISTANTE MATERNELLE - PAIE NOVEMBRE
  ["le projet assistante maternelle", "contient", "la paie de novembre"],
  ["la paie de novembre", "est", "une paie"],
  ["la paie de novembre", "a pour nom", "Paie de Novembre"],
  ["la paie de novembre", "a pour date de création", "20171201"],
  ["la paie de novembre", "a pour date de création (formatté)", "01/12/2017"],

  //PROJET ASSISTANTE MATERNELLE - PAIE DECEMBRE
  ["le projet assistante maternelle", "contient", "la paie de décembre"],
  ["la paie de décembre", "est", "une paie"],
  ["la paie de décembre", "a pour nom", "Paie de Décembre"],
  ["la paie de décembre", "a pour date de création", "20180101"],
  ["la paie de décembre", "a pour date de création (formatté)", "01/01/2018"],

  //SELECTION
  [
    "le projet assistante maternelle",
    "a pour élément sélectionné",
    "la paie d'octobre"
  ]
]

export default () =>
  Promise.all(
    initialFacts.map(initialFact => store.addFact(initialFact))
  ).catch(err => console.error(err))
