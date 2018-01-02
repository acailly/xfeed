import { identity } from "ramda"
import store from "../store"

//Pour chacune des paies
const paieIdArray$ = store.watchFacts$([[["paieId"], "is", "paie"]])
paieIdArray$
  .switchMap(paieIds => {
    return paieIds.map(({ paieId }) => {
      //On récupère le nombre d'heures et le taux horaire brut
      const workingHoursAndHourlyGrossRate$ = store
        .watchSingleFact$([
          [paieId, "workingHours", ["workingHours"]],
          [paieId, "hourlyGrossRate", ["hourlyGrossRate"]]
        ])
        .filter(identity)
      return (
        workingHoursAndHourlyGrossRate$
          //et on calcule le salaire brut : nombre d'heures x taux horaire brut
          .do(({ workingHours, hourlyGrossRate }) => {
            const grossSalary = workingHours * hourlyGrossRate
            store.addSingleFact([paieId, "grossSalary", grossSalary])
          })
          .catch(err => console.error(err))
          .subscribe()
      )
    })
  })
  .catch(err => console.error(err))
  .subscribe()
