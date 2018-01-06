import { pipe, mapObjIndexed, sum, groupBy, pluck, prop } from "ramda"
import store from "../store"

store
  .watchAll$([
    [["laPaie"], "est", "une paie"],
    ["une paie", "est sujette à", ["laCotisation"]],
    [["laPaie"], ["laCotisation"], ["montantDeLaCotisation"]]
  ])
  .do(cotisations => {
    pipe(
      groupBy(prop("laPaie")), //ensemble des cotisations pour chaque paie
      mapObjIndexed(pipe(pluck("montantDeLaCotisation"), sum)), // montant total des cotisations pour chaque paie
      mapObjIndexed((montantTotalDesCotisations, laPaie) => {
        store.setFacts([
          [
            laPaie,
            "est sujette à un total de cotisation de",
            montantTotalDesCotisations
          ],
          [
            laPaie,
            "est sujette à un total de cotisation de (formatté)",
            montantTotalDesCotisations.toFixed(2)
          ]
        ])
      })
    )(cotisations)
  })
  .catch(err => console.error(err))
  .subscribe()
