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

/*
TODO ACY ESSAI de format plus simple pour les regles
rule("salaire net à payer")
  .example("
    la paie d'octobre, est, une paie.
    la paie de novembre, est, une paie.
    la paie d'octobre, a pour salaire net, 234.
    la paie de novembre, a pour salaire net, 312.
    la paie d'octobre, a pour montant total d'indemnité d'entretien, 15.
    la paie de novembre, a pour montant total d'indemnité d'entretien, 12.
  ")
  .expected("
    la paie d'octobre, est, une paie.
    la paie de novembre, est, une paie.
    la paie d'octobre, a pour salaire net, 234.
    la paie de novembre, a pour salaire net, 312.
    la paie d'octobre, a pour montant total d'indemnité d'entretien, 15.
    la paie de novembre, a pour montant total d'indemnité d'entretien, 12.
    la paie d'octobre, a pour salaire net à payer, 249.
    la paie d'octobre, a pour salaire net à payer (formatté), 249.00.
    la paie de novembre, a pour salaire net à payer, 324.
    la paie de novembre, a pour salaire net à payer (formatté), 324.00.
  ")
  .when("facts have changed")
  .find("
    ?laPaie, est, une paie.
    ?laPaie, a pour salaire net, ?salaireNet.
    ?laPaie, a pour montant total d'indemnité d'entretien, ?montantTotalIndemniteEntretien.
  ")
  .transform("
    laPaie: laPaie,
    salaireNetAPayer: sum(salaireNet, montantTotalIndemniteEntretien)
  ")
  .transform("
    laPaie: laPaie,
    salaireNetAPayer: salaireNetAPayer,
    salaireNetAPayerFormatted: toFixed(salaireNetAPayer, 2)
  ")
  .replaceFacts("
    ?laPaie, a pour salaire net à payer, ?salaireNetAPayer.
    ?laPaie, a pour salaire net à payer (formatté), ?salaireNetAPayerFormatted.
  ")
*/
