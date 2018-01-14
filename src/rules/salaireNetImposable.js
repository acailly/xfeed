import store from "../store"

store
  .watchEach$([
    [["laPaie"], "est", "une paie"],
    [["laPaie"], "a pour salaire net", ["salaireNet"]],
    [
      ["laPaie"],
      "a pour montant total des cotisations imposables",
      ["montantTotalDesCotisationsImposables"]
    ]
  ])
  .do(({ laPaie, salaireNet, montantTotalDesCotisationsImposables }) => {
    const salaireNetImposable =
      salaireNet + montantTotalDesCotisationsImposables
    store.setFacts([
      [laPaie, "a pour salaire net imposable", salaireNetImposable],
      [
        laPaie,
        "a pour salaire net imposable (formatté)",
        salaireNetImposable.toFixed(2)
      ]
    ])
  })
  .catch(err => console.error(err))
  .subscribe()
