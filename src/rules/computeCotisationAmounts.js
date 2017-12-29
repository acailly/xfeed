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
    ["paie", "cotisation", ["cotisationId"]],
    [["cotisationId"], "name", ["cotisationName"]],
    [["cotisationId"], "base", ["cotisationBase"]],
    [["cotisationId"], "rate", ["cotisationRate"]],
    [paieId, "grossSalary", ["grossSalary"]]
  ])

  const factsToRemove$ = whenPaieChange$.mergeMap(existingCotisations =>
    Observable.from(existingCotisations).mergeMap(
      ({
        grossSalary,
        cotisationId,
        cotisationName,
        cotisationBase,
        cotisationRate
      }) =>
        store
          .search$([[paieId, cotisationName, ["amount"]]])
          .mergeAll()
          .pluck("amount")
          .map(amount => [[paieId, cotisationName, amount]])
          .toArray()
          .map(unnest)
    )
  )

  const factsToAdd$ = whenPaieChange$
    .mergeAll()
    .map(
      ({
        grossSalary,
        cotisationId,
        cotisationName,
        cotisationBase,
        cotisationRate
      }) => {
        const amount =
          grossSalary * (cotisationBase / 100.0) * (cotisationRate / 100)
        // console.log(
        //   `Computed ${cotisationName} cotisation for ${paieId}: ${amount.toFixed(
        //     2
        //   )}€`
        // ) //DEBUG
        return [[paieId, cotisationName, amount]]
      }
    )

  Observable.zip(factsToAdd$, factsToRemove$).subscribe(
    ([factsToAdd, factsToRemove]) => {
      // console.log(`Ces faits doivent être ajoutés`, factsToAdd) //DEBUG
      // console.log(`Ces faits doivent être supprimés`, factsToRemove) //DEBUG
      store.transaction$(factsToAdd, factsToRemove)
    },
    err => console.error(err)
  )
})
