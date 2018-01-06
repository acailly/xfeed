import store from "../store"

store
  .watchEach$([
    [["laPaie"], "est", "une paie"],
    [["laPaie"], "a pour salaire brut", ["salaireBrut"]],
    [
      ["laPaie"],
      "est sujette à un total de cotisation de",
      ["montantTotalDesCotisations"]
    ]
  ])
  .do(({ laPaie, salaireBrut, montantTotalDesCotisations }) => {
    const salaireNet = salaireBrut - montantTotalDesCotisations
    store.setFacts([
      [laPaie, "a pour salaire net", salaireNet],
      [laPaie, "a pour salaire net (formatté)", salaireNet.toFixed(2)]
    ])
  })
  .catch(err => console.error(err))
  .subscribe()
