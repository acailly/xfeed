import store from "../store"

store
  .watchEach$([
    [["paieId"], "est", "une paie"],
    [["paieId"], "a pour salaire brut", ["grossSalary"]],
    [
      ["paieId"],
      "est sujette à un total de cotisation de",
      ["totalCotisationAmount"]
    ]
  ])
  .do(({ paieId, grossSalary, totalCotisationAmount }) => {
    const netSalary = grossSalary - totalCotisationAmount
    store.setFacts([
      [paieId, "a pour salaire net", netSalary],
      [paieId, "a pour salaire net (formatté)", netSalary.toFixed(2)]
    ])
  })
  .catch(err => console.error(err))
  .subscribe()
