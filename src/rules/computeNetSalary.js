import { identity } from "ramda"
import store from "../store"

const whenPaieIsAdded$ = store
  .watchFacts$([[["paieId"], "is", "paie"]])
  .mergeAll()
  .pluck("paieId")
  .distinct()

whenPaieIsAdded$.subscribe(
  paieId => {
    store
      .watchSingleFact$([
        [paieId, "grossSalary", ["grossSalary"]],
        [paieId, "totalCotisationAmount", ["totalCotisationAmount"]]
      ])
      .filter(identity)
      .subscribe(
        async ({ grossSalary, totalCotisationAmount }) => {
          const netSalary = grossSalary - totalCotisationAmount

          await store.addSingleFact([paieId, "netSalary", netSalary], false)
          await store.addSingleFact(
            [paieId, "netSalaryFormatted", netSalary.toFixed(2)],
            true
          )
        },
        err => console.error(err)
      )
  },
  err => console.error(err)
)
