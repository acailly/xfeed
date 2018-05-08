import store from "../../../store"

store
  .watchEach$([
    [["lesConges"], "est", "un calcul de congés annuel"],
    [
      ["lesConges"],
      "a pour nombre moyen d'heures travaillées par semaine",
      ["heuresParSemaine"]
    ],
    [["lesConges"], "a pour taux horaire brut", ["tauxHoraireBrut"]]
  ])
  .do(({ lesConges, heuresParSemaine, tauxHoraireBrut }) => {
    const salaireBrutParSemaine = heuresParSemaine * tauxHoraireBrut
    store.setFacts([
      [lesConges, "a pour salaire brut par semaine", salaireBrutParSemaine],
      [
        lesConges,
        "a pour salaire brut par semaine (formatté)",
        salaireBrutParSemaine.toFixed(2)
      ]
    ])
  })
  .catch(err => console.error(err))
  .subscribe()
