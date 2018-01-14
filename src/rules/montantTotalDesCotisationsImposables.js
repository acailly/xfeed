import { pipe, mapObjIndexed, sum, groupBy, pluck, prop } from "ramda"
import store from "../store"

store
  .watchAll$([
    [["laPaie"], "est", "une paie"],
    ["une paie", "est imposable sur", ["laCotisation"]],
    [["laPaie"], ["laCotisation"], ["montantDeLaCotisation"]]
  ])
  .do(cotisations => {
    pipe(
      groupBy(prop("laPaie")), //ensemble des cotisations pour chaque paie
      mapObjIndexed(pipe(pluck("montantDeLaCotisation"), sum)), // montant total des cotisations pour chaque paie
      mapObjIndexed((montantTotalDesCotisationsImposables, laPaie) => {
        store.setFacts([
          [
            laPaie,
            "a pour montant total des cotisations imposables",
            montantTotalDesCotisationsImposables
          ],
          [
            laPaie,
            "a pour montant total des cotisations imposables (formatté)",
            montantTotalDesCotisationsImposables.toFixed(2)
          ]
        ])
      })
    )(cotisations)
  })
  .catch(err => console.error(err))
  .subscribe()
