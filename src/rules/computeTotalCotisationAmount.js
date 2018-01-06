import { pipe, mapObjIndexed, sum, groupBy, pluck, prop } from "ramda"
import store from "../store"

store
  .watchAll$([
    [["paieId"], "is", "paie"],
    ["paie", "cotisation", ["cotisationId"]],
    [["paieId"], ["cotisationId"], ["cotisationAmount"]]
  ])
  .do(cotisations => {
    pipe(
      groupBy(prop("paieId")), //cotisations by paieId
      mapObjIndexed(pipe(pluck("cotisationAmount"), sum)), // total cotisation amount by paieId
      mapObjIndexed((totalCotisationAmount, paieId) => {
        store.setFacts([
          [paieId, "totalCotisationAmount", totalCotisationAmount],
          [
            paieId,
            "totalCotisationAmountFormatted",
            totalCotisationAmount.toFixed(2)
          ]
        ])
      })
    )(cotisations)
  })
  .catch(err => console.error(err))
  .subscribe()
