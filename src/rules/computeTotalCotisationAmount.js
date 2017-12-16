import { complement, isEmpty, sum, pluck } from "ramda"
import { Observable } from "rxjs/Observable"
import store from "../store"

store
  .watch([[["paieId"], "is", "paie"]])
  .filter(complement(isEmpty))
  .mergeAll()
  .subscribe(
    //TODO Supprimer les souscriptions quand les paies changent
    ({ paieId }) => {
      store
        .watch([
          ["paie", "cotisation", ["cotisationId"]],
          [["cotisationId"], "name", ["cotisationName"]],
          [paieId, ["cotisationName"], ["cotisationAmount"]]
        ])
        .delayWhen(() => {
          return Observable.forkJoin(
            store
              .search([
                [paieId, "totalCotisationAmount", ["totalCotisationAmount"]]
              ])
              .mergeAll()
              .pluck("totalCotisationAmount")
              .do(totalCotisationAmount =>
                store.deleteFact([
                  paieId,
                  "totalCotisationAmount",
                  totalCotisationAmount
                ])
              ),
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
              .do(totalCotisationAmountFormatted =>
                store.deleteFact([
                  paieId,
                  "totalCotisationAmountFormatted",
                  totalCotisationAmountFormatted
                ])
              )
          )
        })
        .subscribe(
          cotisations => {
            const totalCotisationAmount = sum(
              pluck("cotisationAmount")(cotisations)
            )
            console.log(
              `Computed total cotisation amount for ${paieId}: ${totalCotisationAmount.toFixed(
                2
              )}€`
            )
            store.addFact([
              paieId,
              "totalCotisationAmount",
              totalCotisationAmount
            ])
            store.addFact([
              paieId,
              "totalCotisationAmountFormatted",
              totalCotisationAmount.toFixed(2)
            ])
          },
          err => console.error(err)
        )
    },
    err => console.error(err)
  )
