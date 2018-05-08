import { min, add } from "ramda"
import store from "../../../store"

store
  .watchEach$([
    [["lesConges"], "est", "un calcul de congés annuel"],
    [
      ["lesConges"],
      "a pour nombre de semaines travaillées",
      ["semainesTravaillees"]
    ],
    [
      ["lesConges"],
      "a pour nombre de semaines de congés prises",
      ["semainesCongesPrises"]
    ]
  ])
  .do(
    ({
      lesConges,
      semainesTravaillees,
      semainesCongesPrises,
      joursTravaillesParSemaine
    }) => {
      const nombreJoursAcquisParSemaine = 2.5 / 4
      const joursAcquisSansLimite30jours = Math.ceil(
        add(semainesTravaillees, semainesCongesPrises) *
          nombreJoursAcquisParSemaine
      )
      const joursAcquisAvecLimite30jours = min(joursAcquisSansLimite30jours, 30)

      store.setFacts([
        [
          lesConges,
          "a pour jours acquis sans limite des 30 jours",
          joursAcquisSansLimite30jours
        ],
        [
          lesConges,
          "a pour jours acquis sans enfants à charge",
          joursAcquisAvecLimite30jours
        ]
      ])
    }
  )
  .catch(err => console.error(err))
  .subscribe()
