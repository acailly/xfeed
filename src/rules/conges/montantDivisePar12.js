import store from "../../store"

store
  .watchEach$([
    [["lesConges"], "est", "un calcul de congés annuel"],
    [["lesConges"], "a pour montant", ["montant"]]
  ])
  .do(({ lesConges, montant }) => {
    const montantDivisePar12 = montant / 12
    store.setFacts([
      [lesConges, "a pour montant divisé par 12", montantDivisePar12],
      [
        lesConges,
        "a pour montant divisé par 12 (formatté)",
        montantDivisePar12.toFixed(2)
      ]
    ])
  })
  .catch(err => console.error(err))
  .subscribe()
