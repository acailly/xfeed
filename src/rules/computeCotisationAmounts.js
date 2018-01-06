import store from "../store"

store
  .watchEach$([
    [["paieId"], "is", "paie"],
    ["paie", "cotisation", ["cotisationId"]],
    [["cotisationId"], "name", ["cotisationName"]],
    [["cotisationId"], "base", ["cotisationBase"]],
    [["cotisationId"], "rate", ["cotisationRate"]],
    [["paieId"], "grossSalary", ["grossSalary"]]
  ])
  .do(
    ({
      paieId,
      grossSalary,
      cotisationId,
      cotisationName,
      cotisationBase,
      cotisationRate
    }) => {
      const amount =
        grossSalary * (cotisationBase / 100.0) * (cotisationRate / 100)
      store.setFact([paieId, cotisationId, amount])
    }
  )
  .catch(err => console.error(err))
  .subscribe()
