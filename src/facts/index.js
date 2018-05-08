import debutDeContrat from "./debutDeContrat"
import paie from "./paie"
import calculConges from "./calculConges"
import cotisations from "./paie-cotisations"
import assmat from "./assmat"

export default [
  ...debutDeContrat,
  ...paie,
  ...calculConges,
  ...cotisations,
  ...assmat
]
