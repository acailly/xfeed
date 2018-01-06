import { pipe, mapObjIndexed, sum, groupBy, pluck, prop } from "ramda"
import store from "../store"

store
  .watchAll$([
    [["paieId"], "est", "une paie"],
    ["une paie", "est sujette à", ["cotisationId"]],
    [["paieId"], ["cotisationId"], ["cotisationAmount"]]
  ])
  .do(cotisations => {
    pipe(
      groupBy(prop("paieId")), //cotisations by paieId
      mapObjIndexed(pipe(pluck("cotisationAmount"), sum)), // total cotisation amount by paieId
      mapObjIndexed((totalCotisationAmount, paieId) => {
        store.setFacts([
          [
            paieId,
            "est sujette à un total de cotisation de",
            totalCotisationAmount
          ],
          [
            paieId,
            "est sujette à un total de cotisation de (formatté)",
            totalCotisationAmount.toFixed(2)
          ]
        ])
      })
    )(cotisations)
  })
  .catch(err => console.error(err))
  .subscribe()
