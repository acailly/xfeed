import store from "../store"

store
  .watch([
    [["paieId"], "workingHours", ["workingHours"]],
    [["paieId"], "hourlyGrossRate", ["hourlyGrossRate"]]
  ])
  .mergeAll()
  .subscribe(({ paieId, workingHours, hourlyGrossRate }) => {
    //TODO Supprimer les anciens faits
    const amount = workingHours * hourlyGrossRate
    console.log(`Computed gross salary for ${paieId}: ${amount}€`)
    store.addFact([paieId, "grossSalary", amount])
  })
