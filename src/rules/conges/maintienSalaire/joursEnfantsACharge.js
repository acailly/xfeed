import { min, add } from "ramda"
import store from "../../../store"

store
  .watchEach$([
    [["lesConges"], "est", "un calcul de congés annuel"],
    [
      ["lesConges"],
      "a pour jours acquis sans enfants à charge",
      ["joursAcquisSansEnfantsACharge"],
    ],
    [
      ["lesConges"],
      "a pour jours acquis avec enfants à charge",
      ["joursAcquisAvecEnfantsACharge"],
    ],
  ])
  .do(
    ({
      lesConges,
      joursAcquisSansEnfantsACharge,
      joursAcquisAvecEnfantsACharge,
    }) => {
      const joursEnfantsACharge =
        joursAcquisAvecEnfantsACharge - joursAcquisSansEnfantsACharge

      store.setFacts([
        [
          lesConges,
          "a pour nombre de jours enfants à charge",
          joursEnfantsACharge,
        ],
      ])
    }
  )
  .catch((err) => console.error(err))
  .subscribe()
