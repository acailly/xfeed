import store from "../../store"
import { max } from "ramda"

store
  .watchEach$([
    [["lesConges"], "est", "un calcul de congés annuel"],
    [
      ["lesConges"],
      "a pour montant avec maintien de salaire",
      ["montantMaintienSalaire"]
    ],
    [
      ["lesConges"],
      "a pour montant avec règle du 1/10ème",
      ["montantUnDixieme"]
    ]
  ])
  .do(({ lesConges, montantMaintienSalaire, montantUnDixieme }) => {
    const montant = max(montantMaintienSalaire, montantUnDixieme)
    store.setFacts([
      [lesConges, "a pour montant", montant],
      [lesConges, "a pour montant (formatté)", montant.toFixed(2)]
    ])
  })
  .catch(err => console.error(err))
  .subscribe()
