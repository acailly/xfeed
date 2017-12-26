import { sum, pluck, unnest } from "ramda"
import { Observable } from "rxjs/Observable"
import store from "../store"

const whenPaieIsAdded$ = store
  .watch([[["paieId"], "is", "paie"]])
  .mergeAll()
  .pluck("paieId")
  .distinct()

whenPaieIsAdded$.subscribe(paieId => {
  const whenPaieChange$ = store.watch([
    ["paie", "cotisation", ["cotisationId"]],
    [["cotisationId"], "name", ["cotisationName"]],
    [paieId, ["cotisationName"], ["cotisationAmount"]]
  ])

  const totalCotisationAmountFactsToRemove$ = whenPaieChange$.mergeMap(() =>
    store
      .search([[paieId, "totalCotisationAmount", ["totalCotisationAmount"]]])
      .mergeAll()
      .pluck("totalCotisationAmount")
      .map(totalCotisationAmount => [
        [paieId, "totalCotisationAmount", totalCotisationAmount]
      ])
      .toArray()
      .map(unnest)
  )

  const totalCotisationAmountFormattedFactsToRemove$ = whenPaieChange$.mergeMap(
    () =>
      store
        .search([
          [
            paieId,
            "totalCotisationAmountFormatted",
            ["totalCotisationAmountFormatted"]
          ]
        ])
        .mergeAll()
        .pluck("totalCotisationAmountFormatted")
        .map(totalCotisationAmountFormatted => [
          [
            paieId,
            "totalCotisationAmountFormatted",
            totalCotisationAmountFormatted
          ]
        ])
        .toArray()
        .map(unnest)
  )

  const factsToRemove$ = Observable.zip(
    totalCotisationAmountFactsToRemove$,
    totalCotisationAmountFormattedFactsToRemove$
  ).map(unnest)

  const factsToAdd$ = whenPaieChange$.map(cotisations => {
    const totalCotisationAmount = sum(pluck("cotisationAmount")(cotisations))
    // console.log(
    //   `Computed total cotisation amount for ${paieId}: ${totalCotisationAmount.toFixed(
    //     2
    //   )}€`
    // ) //DEBUG
    return [
      [paieId, "totalCotisationAmount", totalCotisationAmount],
      [
        paieId,
        "totalCotisationAmountFormatted",
        totalCotisationAmount.toFixed(2)
      ]
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
