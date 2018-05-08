import store from "../../store"

store
  .watchEach$([
    [["laPaie"], "est", "une paie"],
    [["laPaie"], "a pour salaire net", ["salaireNet"]],
    [
      ["laPaie"],
      "a pour montant total d'indemnité d'entretien",
      ["montantTotalIndemniteEntretien"]
    ]
  ])
  .do(({ laPaie, salaireNet, montantTotalIndemniteEntretien }) => {
    const salaireNetAPayer = salaireNet + montantTotalIndemniteEntretien
    store.setFacts([
      [laPaie, "a pour salaire net à payer", salaireNetAPayer],
      [
        laPaie,
        "a pour salaire net à payer (formatté)",
        salaireNetAPayer.toFixed(2)
      ]
    ])
  })
  .catch(err => console.error(err))
  .subscribe()
