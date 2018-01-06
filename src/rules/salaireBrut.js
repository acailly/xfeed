import store from "../store"

store
  .watchEach$([
    [["laPaie"], "est", "une paie"],
    [["laPaie"], "a pour nombre d'heures travaillées", ["heuresTravaillees"]],
    [["laPaie"], "a pour taux horaire brut", ["tauxHoraireBrut"]]
  ])
  .do(({ laPaie, heuresTravaillees, tauxHoraireBrut }) => {
    const salaireBrut = heuresTravaillees * tauxHoraireBrut
    store.setFacts([
      [laPaie, "a pour salaire brut", salaireBrut],
      [laPaie, "a pour salaire brut (formatté)", salaireBrut.toFixed(2)]
    ])
  })
  .catch(err => console.error(err))
  .subscribe()
