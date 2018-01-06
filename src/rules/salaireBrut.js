import store from "../store"

store
  .watchEach$([
    [["paieId"], "est", "une paie"],
    [["paieId"], "a pour nombre d'heures travaillées", ["workingHours"]],
    [["paieId"], "a pour taux horaire brut", ["hourlyGrossRate"]]
  ])
  .do(({ paieId, workingHours, hourlyGrossRate }) => {
    const grossSalary = workingHours * hourlyGrossRate
    store.setFacts([
      [paieId, "a pour salaire brut", grossSalary],
      [paieId, "a pour salaire brut (formatté)", grossSalary.toFixed(2)]
    ])
  })
  .catch(err => console.error(err))
  .subscribe()
