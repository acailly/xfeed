import { not, equals } from "ramda"
import store from "../store"

store.changed$().subscribe(() => computeGrossSalary())

const computeGrossSalary = async () => {
  const paieIds = (await store.searchFacts([[["paieId"], "is", "paie"]])).map(
    ({ paieId }) => paieId
  )

  return Promise.all(
    paieIds.map(async paieId => {
      const workingHours = (await store.searchFacts([
        [paieId, "workingHours", ["workingHours"]]
      ])).map(({ workingHours }) => workingHours)[0]
      const hourlyGrossRate = (await store.searchFacts([
        [paieId, "hourlyGrossRate", ["hourlyGrossRate"]]
      ])).map(({ hourlyGrossRate }) => hourlyGrossRate)[0]
      const grossSalary = workingHours * hourlyGrossRate
      const factsToAdd = [[paieId, "grossSalary", grossSalary]]

      const existingGrossSalaryArray = (await store.searchFacts([
        [paieId, "grossSalary", ["grossSalary"]]
      ])).map(({ grossSalary }) => grossSalary)
      const factsToRemove = existingGrossSalaryArray.map(
        existingGrossSalary => [paieId, "grossSalary", existingGrossSalary]
      )

      if (not(equals(factsToAdd, factsToRemove))) {
        return store.transaction(factsToAdd, factsToRemove)
      } else {
        return Promise.resolve(true)
      }
    })
  )
}
