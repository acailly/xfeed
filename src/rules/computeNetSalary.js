import { complement, isEmpty } from "ramda"
import { Observable } from "rxjs/Observable"
import store from "../store"

store
  .watch([[["paieId"], "is", "paie"]])
  .filter(complement(isEmpty))
  .mergeAll()
  .subscribe(
    //TODO Supprimer les souscriptions quand les paies changent
    ({ paieId }) => {
      store
        .watch([
          [paieId, "grossSalary", ["grossSalary"]],
          [paieId, "totalCotisationAmount", ["totalCotisationAmount"]]
        ])
        .delayWhen(() => {
          return Observable.forkJoin(
            store
              .search([[paieId, "netSalary", ["netSalary"]]])
              .mergeAll()
              .pluck("netSalary")
              .do(netSalary =>
                store.deleteFact([paieId, "netSalary", netSalary])
              ),
            store
              .search([[paieId, "netSalaryFormatted", ["netSalaryFormatted"]]])
              .mergeAll()
              .pluck("netSalaryFormatted")
              .do(netSalaryFormatted =>
                store.deleteFact([
                  paieId,
                  "netSalaryFormatted",
                  netSalaryFormatted
                ])
              )
          )
        })
        .mergeAll()
        .subscribe(({ grossSalary, totalCotisationAmount }) => {
          const amount = grossSalary - totalCotisationAmount
          console.log(`Computed net salary for ${paieId}: ${amount}€`)
          store.addFact([paieId, "netSalary", amount])
          store.addFact([paieId, "netSalaryFormatted", amount.toFixed(2)])
        })
    },
    err => console.error(err)
  )
