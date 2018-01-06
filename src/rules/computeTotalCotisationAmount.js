import { sum, pluck } from "ramda"
import store from "../store"

//Pour chacune des paies
const paieIdArray$ = store.watchAll$([[["paieId"], "is", "paie"]])
paieIdArray$
  .switchMap(paieIds => {
    return paieIds.map(({ paieId }) => {
      //On récupère le montant de toutes les cotisations
      const cotisations$ = store.watchAll$([
        ["paie", "cotisation", ["cotisationId"]],
        [paieId, ["cotisationId"], ["cotisationAmount"]]
      ])

      return (
        cotisations$
          //et on calcule le montant total des cotisations
          .do(async cotisations => {
            const totalCotisationAmount = sum(
              pluck("cotisationAmount")(cotisations)
            )

            await store.setFact(
              [paieId, "totalCotisationAmount", totalCotisationAmount],
              false
            )
            await store.setFact(
              [
                paieId,
                "totalCotisationAmountFormatted",
                totalCotisationAmount.toFixed(2)
              ],
              true
            )
          })
          .catch(err => console.error(err))
          .subscribe()
      )
    })
  })
  .catch(err => console.error(err))
  .subscribe()
