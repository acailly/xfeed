import { min, add } from "ramda"
import store from "../../../store"

store
  .watchEach$([
    [["lesConges"], "est", "un calcul de congés annuel"],
    [["lesConges"], "a pour nombre de jours travaillés", ["joursTravailles"]],
    [
      ["lesConges"],
      "a pour nombre de jours travaillés hebdomadaire",
      ["joursTravaillesHebdomaire"]
    ]
  ])
  .do(({ lesConges, joursTravailles, joursTravaillesHebdomaire }) => {
    const semainesTravaillees = joursTravailles / joursTravaillesHebdomaire

    store.setFacts([
      [lesConges, "a pour nombre de semaines travaillées", semainesTravaillees]
    ])
  })
  .catch(err => console.error(err))
  .subscribe()
