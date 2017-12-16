import { complement, isEmpty } from "ramda"
import { Observable } from "rxjs/Observable"
import store from "../store"

//TODO ACY SUPPR
store
  .watch([
    [["paieId"], "workingHours", ["workingHours"]],
    [["paieId"], "hourlyGrossRate", ["hourlyGrossRate"]]
  ])
  .mergeAll()
  .subscribe(({ paieId, workingHours, hourlyGrossRate }) => {
    //TODO Supprimer les anciens faits
    const amount = workingHours * hourlyGrossRate
    console.log(`Computed gross salary for ${paieId}: ${amount}€`)
    store.addFact([paieId, "grossSalary", amount])
  })

//TODO ACY Ca marche pas, pourquoi ?
// store
//   .watch([[["paieId"], "is", "paie"]])
//   .filter(complement(isEmpty))
//   .mergeAll()
//   .subscribe(
//     //TODO Supprimer les souscriptions quand les paies changent
//     ({ paieId }) => {
//       store
//         .watch([
//           [paieId, "workingHours", ["workingHours"]],
//           [paieId, "hourlyGrossRate", ["hourlyGrossRate"]]
//         ])
//         .delayWhen(() =>
//           store
//             .search([[paieId, "grossSalary", ["grossSalary"]]])
//             .mergeAll()
//             .pluck("grossSalary")
//             .do(grossSalary =>
//               store.deleteFact([paieId, "grossSalary", grossSalary])
//             )
//         )
//         .mergeAll()
//         .subscribe(({ workingHours, hourlyGrossRate }) => {
//           const amount = workingHours * hourlyGrossRate
//           console.log(`Computed gross salary for ${paieId}: ${amount}€`)
//           store.addFact([paieId, "grossSalary", amount])
//         })
//     },
//     err => console.error(err)
//   )
