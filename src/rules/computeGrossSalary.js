import store from "../store"

store
  .watchEach$([
    [["paieId"], "is", "paie"],
    [["paieId"], "workingHours", ["workingHours"]],
    [["paieId"], "hourlyGrossRate", ["hourlyGrossRate"]]
  ])
  .do(({ paieId, workingHours, hourlyGrossRate }) => {
    const grossSalary = workingHours * hourlyGrossRate
    store.setFact([paieId, "grossSalary", grossSalary])
  })
  .catch(err => console.error(err))
  .subscribe()
