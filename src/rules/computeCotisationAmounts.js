import { sortBy, prop, complement, isEmpty } from "ramda"
import { Observable } from "rxjs/Observable"
import store from "../store"

const fetchCotisations = store
  .watch([
    ["paie", "cotisation", ["cotisationId"]],
    [["cotisationId"], "name", ["cotisationName"]],
    [["cotisationId"], "base", ["cotisationBase"]],
    [["cotisationId"], "rate", ["cotisationRate"]]
  ])
  .map(sortBy(prop("cotisationBase")))

const fetchGrossSalary = store
  .watch([[["paieId"], "grossSalary", ["grossSalary"]]])
  .filter(complement(isEmpty))

Observable.combineLatest(fetchCotisations, fetchGrossSalary).subscribe(
  ([cotisations, [{ paieId, grossSalary }]]) => {
    //TODO Supprimer les anciens faits
    cotisations.forEach(
      ({ cotisationId, cotisationName, cotisationBase, cotisationRate }) => {
        const amount =
          grossSalary * (cotisationBase / 100.0) * (cotisationRate / 100)
        console.log(
          `Computed ${cotisationName} cotisation for ${paieId}: ${amount.toFixed(
            2
          )}€`
        )
        store.addFact([paieId, cotisationName, amount])
      }
    )
  },
  err => console.error(err)
)
