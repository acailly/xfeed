import store from "../../../store"

store
  .watchEach$([
    [["lesConges"], "est", "un calcul de congés annuel"],
    [
      ["lesConges"],
      "a pour salaire brut par semaine",
      ["salaireBrutParSemaine"]
    ]
  ])
  .do(({ lesConges, salaireBrutParSemaine }) => {
    const salaireBrutParJourOuvrable = salaireBrutParSemaine / 6
    store.setFacts([
      [
        lesConges,
        "a pour salaire brut par jour ouvrable",
        salaireBrutParJourOuvrable
      ],
      [
        lesConges,
        "a pour salaire brut par jour ouvrable (formatté)",
        salaireBrutParJourOuvrable.toFixed(2)
      ]
    ])
  })
  .catch(err => console.error(err))
  .subscribe()
