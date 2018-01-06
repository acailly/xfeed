import { identity } from "ramda"
import store from "../store"

//Pour chacune des paies
const paieIdArray$ = store.watchAll$([[["paieId"], "is", "paie"]])
paieIdArray$
  .switchMap(paieIds => {
    return paieIds.map(({ paieId }) => {
      //On récupère le salaire brut et le montant total des cotisations
      const grossSalaryAndTotalCotisationAmount$ = store.watchEach$([
        [paieId, "grossSalary", ["grossSalary"]],
        [paieId, "totalCotisationAmount", ["totalCotisationAmount"]]
      ])
      return (
        grossSalaryAndTotalCotisationAmount$
          //et on calcule le salaire net : salaire brut - montant total des cotisations
          .do(async ({ grossSalary, totalCotisationAmount }) => {
            const netSalary = grossSalary - totalCotisationAmount

            await store.setFact([paieId, "netSalary", netSalary], false)
            await store.setFact(
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
