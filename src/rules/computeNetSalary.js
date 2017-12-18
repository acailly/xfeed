import { unnest } from "ramda"
import { Observable } from "rxjs/Observable"
import store from "../store"

const watchEveryPaie$ = store
  .watch([[["paieId"], "is", "paie"]])
  .mergeAll()
  .pluck("paieId")
  .distinct()
// .do(paieId => console.log(`Cette paie a changé`, paieId))

watchEveryPaie$.subscribe(paieId => {
  const watchPaieChange$ = store.watch([
    [paieId, "grossSalary", ["grossSalary"]],
    [paieId, "totalCotisationAmount", ["totalCotisationAmount"]]
  ])

  const netSalaryFactsToRemove$ = watchPaieChange$.mergeMap(
    ({ paieId }) =>
      store
        .search([[paieId, "netSalary", ["netSalary"]]])
        .mergeAll()
        .pluck("netSalary")
        .map(netSalary => [[paieId, "netSalary", netSalary]])
        .toArray()
        .map(unnest)
    // .do(facts =>
    //   console.log(
    //     `Ces faits sur le salaire net doivent être supprimés`,
    //     facts
    //   )
    // )
  )

  const netSalaryFormattedFactsToRemove$ = watchPaieChange$.mergeMap(
    ({ paieId }) =>
      store
        .search([[paieId, "netSalaryFormatted", ["netSalaryFormatted"]]])
        .mergeAll()
        .pluck("netSalaryFormatted")
        .map(netSalaryFormatted => [
          [paieId, "netSalaryFormatted", netSalaryFormatted]
        ])
        .toArray()
        .map(unnest)
    // .do(facts =>
    //   console.log(
    //     `Ces faits sur le salaire net formatté doivent être supprimés`,
    //     facts
    //   )
    // )
  )

  const factsToRemove$ = Observable.zip(
    netSalaryFactsToRemove$,
    netSalaryFormattedFactsToRemove$
  ).map(unnest)
  // .do(facts => console.log(`Ces faits doivent être supprimés`, facts))

  const factsToAdd$ = watchPaieChange$
    .mergeAll()
    .map(({ grossSalary, totalCotisationAmount }) => {
      const amount = grossSalary - totalCotisationAmount
      console.log(`Computed net salary for ${paieId}: ${amount}€`)
      return [
        [paieId, "netSalary", amount],
        [paieId, "netSalaryFormatted", amount.toFixed(2)]
      ]
    })
  // .do(facts => console.log(`Ces faits doivent être ajoutés`, facts))

  Observable.zip(factsToAdd$, factsToRemove$).subscribe(
    ([factsToAdd, factsToRemove]) => {
      //TODO Encapsuler dans une seule transaction
      factsToRemove.forEach(f => store.deleteFact(f))
      factsToAdd.forEach(f => store.addFact(f))
    },
    err => console.error(err)
  )
})
