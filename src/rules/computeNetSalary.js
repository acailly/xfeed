import store from "../store"

store
  .watchEach$([
    [["paieId"], "is", "paie"],
    [["paieId"], "grossSalary", ["grossSalary"]],
    [["paieId"], "totalCotisationAmount", ["totalCotisationAmount"]]
  ])
  .do(({ paieId, grossSalary, totalCotisationAmount }) => {
    const netSalary = grossSalary - totalCotisationAmount
    store.setFacts([
      [paieId, "netSalary", netSalary],
      [paieId, "netSalaryFormatted", netSalary.toFixed(2)]
    ])
  })
  .catch(err => console.error(err))
  .subscribe()
