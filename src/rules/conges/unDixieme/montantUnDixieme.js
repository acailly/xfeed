import store from "../../../store"

store
  .watchEach$([
    [["lesConges"], "est", "un calcul de congés annuel"],
    [
      ["lesConges"],
      "a pour remuneration brute totale",
      ["remunerationBruteTotale"]
    ]
  ])
  .do(({ lesConges, remunerationBruteTotale }) => {
    const montantUnDixieme = remunerationBruteTotale / 10
    store.setFacts([
      [lesConges, "a pour montant avec règle du 1/10ème", montantUnDixieme],
      [
        lesConges,
        "a pour montant avec règle du 1/10ème (formatté)",
        montantUnDixieme.toFixed(2)
      ]
    ])
  })
  .catch(err => console.error(err))
  .subscribe()
