import debutDeContrat from "./debutDeContrat"
import paie from "./paie"
import calculCongesAnnuels from "./calculCongesAnnuels"
import cotisations from "./paie-cotisations"
import assmat from "./assmat"

export default [
  ...debutDeContrat,
  ...paie,
  ...calculCongesAnnuels,
  ...cotisations,
  ...assmat
]
