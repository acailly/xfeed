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
        [paieId, "workingHours", ["workingHours"]],
        [paieId, "hourlyGrossRate", ["hourlyGrossRate"]]
      ])
      .filter(identity)
      .subscribe(
        ({ workingHours, hourlyGrossRate }) => {
          const grossSalary = workingHours * hourlyGrossRate
          store.addSingleFact([paieId, "grossSalary", grossSalary])
        },
        err => console.error(err)
      )
  },
  err => console.error(err)
)
