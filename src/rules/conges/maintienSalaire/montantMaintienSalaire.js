import store from "../../../store"

store
  .watchEach$([
    [["lesConges"], "est", "un calcul de congés annuel"],
    [
      ["lesConges"],
      "a pour salaire brut par jour ouvrable",
      ["salaireBrutParJourOuvrable"]
    ],
    [
      ["lesConges"],
      "a pour jours acquis avec enfants à charge",
      ["joursAcquisAvecEnfantsACharge"]
    ]
  ])
  .do(
    ({
      lesConges,
      salaireBrutParJourOuvrable,
      joursAcquisAvecEnfantsACharge
    }) => {
      const montantMaintienSalaire =
        salaireBrutParJourOuvrable * joursAcquisAvecEnfantsACharge
      store.setFacts([
        [
          lesConges,
          "a pour montant avec maintien de salaire",
          montantMaintienSalaire
        ],
        [
          lesConges,
          "a pour montant avec maintien de salaire (formatté)",
          montantMaintienSalaire.toFixed(2)
        ]
      ])
    }
  )
  .catch(err => console.error(err))
  .subscribe()
