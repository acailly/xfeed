import { unnest } from "ramda"
import { Observable } from "rxjs/Observable"
import store from "../store"

const whenPaieIsAdded$ = store
  .watch([[["paieId"], "is", "paie"]])
  .mergeAll()
  .pluck("paieId")
  .distinct()

whenPaieIsAdded$.subscribe(paieId => {
  const whenPaieChange$ = store.watch([
    [paieId, "grossSalary", ["grossSalary"]],
    [paieId, "totalCotisationAmount", ["totalCotisationAmount"]]
  ])

  const netSalaryFactsToRemove$ = whenPaieChange$.mergeMap(() =>
    store
      .search([[paieId, "netSalary", ["netSalary"]]])
      .mergeAll()
      .pluck("netSalary")
      .map(netSalary => [[paieId, "netSalary", netSalary]])
      .toArray()
      .map(unnest)
  )

  const netSalaryFormattedFactsToRemove$ = whenPaieChange$.mergeMap(() =>
    store
      .search([[paieId, "netSalaryFormatted", ["netSalaryFormatted"]]])
      .mergeAll()
      .pluck("netSalaryFormatted")
      .map(netSalaryFormatted => [
        [paieId, "netSalaryFormatted", netSalaryFormatted]
      ])
      .toArray()
      .map(unnest)
  )

  const factsToRemove$ = Observable.zip(
    netSalaryFactsToRemove$,
    netSalaryFormattedFactsToRemove$
  ).map(unnest)

  const factsToAdd$ = whenPaieChange$
    .mergeAll()
    .map(({ grossSalary, totalCotisationAmount }) => {
      const amount = grossSalary - totalCotisationAmount
      // console.log(`Computed net salary for ${paieId}: ${amount}€`) //DEBUG
      return [
        [paieId, "netSalary", amount],
        [paieId, "netSalaryFormatted", amount.toFixed(2)]
      ]
    })

  Observable.zip(factsToAdd$, factsToRemove$).subscribe(
    ([factsToAdd, factsToRemove]) => {
      // console.log(`Ces faits doivent être ajoutés`, factsToAdd) //DEBUG
      // console.log(`Ces faits doivent être supprimés`, factsToRemove) //DEBUG
      store.transaction(factsToAdd, factsToRemove)
    },
    err => console.error(err)
  )
})
