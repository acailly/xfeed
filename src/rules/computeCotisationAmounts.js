import store from "../store"

//Pour chacune des paies
const paieIdArray$ = store.watchFacts$([[["paieId"], "is", "paie"]])
paieIdArray$
  .switchMap(paieIds => {
    return paieIds.map(({ paieId }) => {
      //On récupère le salaire brut et les informations de chaque cotisation applicable
      const cotisations$ = store
        .watchFacts$([
          ["paie", "cotisation", ["cotisationId"]],
          [["cotisationId"], "name", ["cotisationName"]],
          [["cotisationId"], "base", ["cotisationBase"]],
          [["cotisationId"], "rate", ["cotisationRate"]],
          [paieId, "grossSalary", ["grossSalary"]]
        ])
        .mergeAll()

      return (
        cotisations$
          //et on calcule le montant de chaque cotisation net : salaire brut x taux de cotisation
          .do(
            ({
              grossSalary,
              cotisationId,
              cotisationName,
              cotisationBase,
              cotisationRate
            }) => {
              const amount =
                grossSalary * (cotisationBase / 100.0) * (cotisationRate / 100)
              store.addSingleFact([paieId, cotisationId, amount])
            }
          )
          .catch(err => console.error(err))
          .subscribe()
      )
    })
  })
  .catch(err => console.error(err))
  .subscribe()
