import { identity } from "ramda"
import store from "../store"

//Pour chacune des paies
const paieIdArray$ = store.watchAll$([[["paieId"], "is", "paie"]])
paieIdArray$
  .switchMap(paieIds => {
    return paieIds.map(({ paieId }) => {
      //On récupère le nombre d'heures et le taux horaire brut
      const workingHoursAndHourlyGrossRate$ = store.watchEach$([
        [paieId, "workingHours", ["workingHours"]],
        [paieId, "hourlyGrossRate", ["hourlyGrossRate"]]
      ])
      return (
        workingHoursAndHourlyGrossRate$
          //et on calcule le salaire brut : nombre d'heures x taux horaire brut
          .do(({ workingHours, hourlyGrossRate }) => {
            const grossSalary = workingHours * hourlyGrossRate
            store.setFact([paieId, "grossSalary", grossSalary])
          })
          .catch(err => console.error(err))
          .subscribe()
      )
    })
  })
  .catch(err => console.error(err))
  .subscribe()
