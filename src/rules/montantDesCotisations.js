import store from "../store"

store
  .watchEach$([
    [["laPaie"], "est", "une paie"],
    ["une paie", "est sujette à", ["laCotisation"]],
    [["laCotisation"], "a pour nom", ["nomDeLaCotisation"]],
    [["laCotisation"], "a pour base", ["baseDeLaCotisation"]],
    [["laCotisation"], "a pour taux", ["tauxDeLaCotisation"]],
    [["laPaie"], "a pour salaire brut", ["salaireBrut"]]
  ])
  .do(
    ({
      laPaie,
      salaireBrut,
      laCotisation,
      nomDeLaCotisation,
      baseDeLaCotisation,
      tauxDeLaCotisation
    }) => {
      const montantDeLaCotisation =
        salaireBrut * (baseDeLaCotisation / 100.0) * (tauxDeLaCotisation / 100)
      store.setFacts([
        [laPaie, laCotisation, montantDeLaCotisation],
        [laPaie, laCotisation + " (formatté)", montantDeLaCotisation.toFixed(2)]
      ])
    }
  )
  .catch(err => console.error(err))
  .subscribe()
