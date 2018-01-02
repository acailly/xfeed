import { identity } from "ramda"
import store from "../store"

//Pour chacune des paies
const paieIdArray$ = store.watchFacts$([[["paieId"], "is", "paie"]])
paieIdArray$
  .switchMap(paieIds => {
    return paieIds.map(({ paieId }) => {
      //On récupère le salaire brut et le montant total des cotisations
      const grossSalaryAndTotalCotisationAmount$ = store
        .watchSingleFact$([
          [paieId, "grossSalary", ["grossSalary"]],
          [paieId, "totalCotisationAmount", ["totalCotisationAmount"]]
        ])
        .filter(identity)
      return (
        grossSalaryAndTotalCotisationAmount$
          //et on calcule le salaire net : salaire brut - montant total des cotisations
          .do(async ({ grossSalary, totalCotisationAmount }) => {
            const netSalary = grossSalary - totalCotisationAmount

            await store.addSingleFact([paieId, "netSalary", netSalary], false)
            await store.addSingleFact(
              [paieId, "netSalaryFormatted", netSalary.toFixed(2)],
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
