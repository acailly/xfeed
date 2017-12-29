import { unnest } from "ramda"
import { Observable } from "rxjs/Observable"
import store from "../store"

const whenPaieIsAdded$ = store
  .watch$([[["paieId"], "is", "paie"]])
  .mergeAll()
  .pluck("paieId")
  .distinct()

whenPaieIsAdded$.subscribe(paieId => {
  const whenPaieChange$ = store.watch$([
    [paieId, "workingHours", ["workingHours"]],
    [paieId, "hourlyGrossRate", ["hourlyGrossRate"]]
  ])

  const factsToRemove$ = whenPaieChange$.mergeMap(() =>
    store
      .search$([[paieId, "grossSalary", ["grossSalary"]]])
      .mergeAll()
      .pluck("grossSalary")
      .map(grossSalary => [[paieId, "grossSalary", grossSalary]])
      .toArray()
      .map(unnest)
  )

  const factsToAdd$ = whenPaieChange$
    .mergeAll()
    .map(({ workingHours, hourlyGrossRate }) => {
      const amount = workingHours * hourlyGrossRate
      // console.log(`Computed gross salary for ${paieId}: ${amount}€`) //DEBUG
      return [[paieId, "grossSalary", amount]]
    })

  Observable.zip(factsToAdd$, factsToRemove$).subscribe(
    ([factsToAdd, factsToRemove]) => {
      // console.log(`Ces faits doivent être ajoutés`, factsToAdd) //DEBUG
      // console.log(`Ces faits doivent être supprimés`, factsToRemove) //DEBUG
      store.transaction$(factsToAdd, factsToRemove)
    },
    err => console.error(err)
  )
})
