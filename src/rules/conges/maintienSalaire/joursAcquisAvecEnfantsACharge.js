import { min, add } from "ramda"
import store from "../../../store"

store
  .watchEach$([
    [["lesConges"], "est", "un calcul de congés annuel"],
    [
      ["lesConges"],
      "a pour jours acquis sans enfants à charge",
      ["joursAcquisSansEnfantsACharge"]
    ],
    [
      ["lesConges"],
      "plus ou moins de 21 ans au 30 avril",
      ["plusOuMoins21ans"]
    ],
    [
      ["lesConges"],
      "nombre enfants de moins de 15 ans au 30 avril",
      ["nombreEnfantsACharge"]
    ]
  ])
  .do(
    ({
      lesConges,
      joursAcquisSansEnfantsACharge,
      plusOuMoins21ans,
      nombreEnfantsACharge
    }) => {
      const joursEnfantsACharge = nombreEnfantsACharge * 2

      if (plusOuMoins21ans === "plus") {
        const joursAcquisAvecEnfantsACharge = min(
          add(joursAcquisSansEnfantsACharge, joursEnfantsACharge),
          30
        )

        store.setFacts([
          [
            lesConges,
            "a pour jours acquis avec enfants à charge",
            joursAcquisAvecEnfantsACharge
          ]
        ])
      } else if (plusOuMoins21ans === "moins") {
        const joursAcquisAvecEnfantsACharge = add(
          joursAcquisSansEnfantsACharge,
          joursEnfantsACharge
        )

        store.setFacts([
          [
            lesConges,
            "a pour jours acquis avec enfants à charge",
            joursAcquisAvecEnfantsACharge
          ]
        ])
      }
    }
  )
  .catch(err => console.error(err))
  .subscribe()
