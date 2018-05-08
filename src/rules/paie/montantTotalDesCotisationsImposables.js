import { pipe, mapObjIndexed, sum, groupBy, pluck, prop } from "ramda"
import store from "../../store"

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

/*
TODO ACY ESSAI de format plus simple pour les regles
rule("montant total des cotisations imposables")
  .example("
    la paie d'octobre, est, une paie.
    la paie de novembre, est, une paie.
    une paie, est imposable sur, la CSG.
    une paie, est imposable sur, la RDS.
    la paie d'octobre, la CSG, 12.
    la paie d'octobre, la RDS, 6.
    la paie de novembre, la CSG, 13.
    la paie de novembre, la RDS, 4.
  ")
  .expected("
    la paie d'octobre, est, une paie.
    la paie de novembre, est, une paie.
    une paie, est imposable sur, la CSG.
    une paie, est imposable sur, la RDS.
    la paie d'octobre, la CSG, 12.
    la paie d'octobre, la RDS, 6.
    la paie de novembre, la CSG, 13.
    la paie de novembre, la RDS, 4.
    la paie d'octobre, a pour montant total des cotisations imposables, 18.
    la paie d'octobre, a pour montant total des cotisations imposables (formatté), 18.00.
    la paie de novembre, a pour montant total des cotisations imposables, 17.
    la paie de novembre, a pour montant total des cotisations imposables (formatté), 17.00.
  ")
  .when("facts have changed")
  .find("
    ?laPaie, est, une paie.
    une paie, est imposable sur, ?laCotisation.
    ?laPaie, ?laCotisation, ?montantDeLaCotisation.
  ")
  .groupBy("laPaie")
  .aggregate("
    laPaie: first(laPaie),
    montantTotalDesCotisationsImposables: sum(montantDeLaCotisation)
  ")
  .transform("
    laPaie: laPaie,
    montantTotalDesCotisationsImposables: montantTotalDesCotisationsImposables,
    montantTotalDesCotisationsImposablesFormatted: toFixed(montantTotalDesCotisationsImposables, 2)
  ")
  .replaceFacts("
    ?laPaie, a pour montant total des cotisations imposables, ?montantTotalDesCotisationsImposables.
    ?laPaie, a pour montant total des cotisations imposables (formatté), ?montantTotalDesCotisationsImposablesFormatted.
  ")
*/
