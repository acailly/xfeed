import store from "../store"

store
  .watchEach$([
    [["paieId"], "est", "une paie"],
    ["une paie", "est sujette à", ["cotisationId"]],
    [["cotisationId"], "a pour nom", ["cotisationName"]],
    [["cotisationId"], "a pour base", ["cotisationBase"]],
    [["cotisationId"], "a pour taux", ["cotisationRate"]],
    [["paieId"], "a pour salaire brut", ["grossSalary"]]
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
      store.setFacts([
        [paieId, cotisationId, amount],
        [paieId, cotisationId + " (formatté)", amount.toFixed(2)]
      ])
    }
  )
  .catch(err => console.error(err))
  .subscribe()
