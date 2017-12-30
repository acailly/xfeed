import { sum, pluck } from "ramda"
import store from "../store"

const whenPaieIsAdded$ = store
  .watchFacts$([[["paieId"], "is", "paie"]])
  .mergeAll()
  .pluck("paieId")
  .distinct()

whenPaieIsAdded$.subscribe(
  paieId => {
    const cotisations$ = store.watchFacts$([
      ["paie", "cotisation", ["cotisationId"]],
      [["cotisationId"], "name", ["cotisationName"]],
      [paieId, ["cotisationName"], ["cotisationAmount"]]
    ])

    cotisations$.subscribe(
      async cotisations => {
        const totalCotisationAmount = sum(
          pluck("cotisationAmount")(cotisations)
        )

        await store.addSingleFact(
          [paieId, "totalCotisationAmount", totalCotisationAmount],
          false
        )
        await store.addSingleFact(
          [
            paieId,
            "totalCotisationAmountFormatted",
            totalCotisationAmount.toFixed(2)
          ],
          true
        )
      },
      err => console.error(err)
    )
  },
  err => console.error(err)
)
