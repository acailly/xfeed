import store from "../store"

const whenPaieIsAdded$ = store
  .watchFacts$([[["paieId"], "is", "paie"]])
  .mergeAll()
  .pluck("paieId")
  .distinct()

whenPaieIsAdded$.subscribe(
  paieId => {
    const cotisations$ = store.watchFacts$([
      ["paie", "cotisation", ["cotisationId"]],
      [["cotisationId"], "name", ["cotisationName"]],
      [["cotisationId"], "base", ["cotisationBase"]],
      [["cotisationId"], "rate", ["cotisationRate"]],
      [paieId, "grossSalary", ["grossSalary"]]
    ])

    cotisations$.mergeAll().subscribe(
      ({
        grossSalary,
        cotisationId,
        cotisationName,
        cotisationBase,
        cotisationRate
      }) => {
        const amount =
          grossSalary * (cotisationBase / 100.0) * (cotisationRate / 100)
        store.addSingleFact([paieId, cotisationName, amount])
      },
      err => console.error(err)
    )
  },
  err => console.error(err)
)
