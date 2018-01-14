import store from "../store"

store
  .watchEach$([
    [["laPaie"], "est", "une paie"],
    [["laPaie"], "a pour nombre de jours travaillés", ["joursTravaillees"]],
    [
      ["laPaie"],
      "a pour indemnité journalière d'entretien",
      ["indemniteJournaliereEntretien"]
    ]
  ])
  .do(({ laPaie, joursTravaillees, indemniteJournaliereEntretien }) => {
    const montantTotalIndemniteEntretien =
      joursTravaillees * indemniteJournaliereEntretien
    store.setFacts([
      [
        laPaie,
        "a pour montant total d'indemnité d'entretien",
        montantTotalIndemniteEntretien
      ],
      [
        laPaie,
        "a pour montant total d'indemnité d'entretien (formatté)",
        montantTotalIndemniteEntretien.toFixed(2)
      ]
    ])
  })
  .catch(err => console.error(err))
  .subscribe()
