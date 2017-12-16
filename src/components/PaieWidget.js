import React, { PureComponent, Fragment } from "react"
import { sortBy, prop } from "ramda"
import Card from "./Card"
import Title from "./Title"
import SubTitle from "./SubTitle"
import FactWidget from "./FactWidget"
import store from "../store"

class PaieWidget extends PureComponent {
  state = {
    cotisations: []
  }

  componentDidMount = () => {
    const { paieId } = this.props

    const fetchCotisations = store
      .search([
        ["paie", "cotisation", ["cotisationId"]],
        [["cotisationId"], "name", ["cotisationName"]],
        [["cotisationId"], "base", ["cotisationBase"]],
        [["cotisationId"], "rate", ["cotisationRate"]]
      ])
      .then(cotisations => sortBy(prop("cotisationBase"))(cotisations))

    const fetchGrossSalary = store.search([
      [paieId, "grossSalary", ["grossSalary"]]
    ])

    Promise.all([fetchCotisations, fetchGrossSalary])
      .then(([cotisations, [{ grossSalary }]]) => {
        this.setState({ cotisations, grossSalary })
      })
      .catch(err => console.error(err))
  }

  renderCotisation = ({
    cotisationId,
    cotisationName,
    cotisationBase,
    cotisationRate
  }) => {
    const amount =
      this.state.grossSalary * (cotisationBase / 100.0) * (cotisationRate / 100)
    return (
      <Fragment key={cotisationId}>
        {cotisationName} s'applique sur {cotisationBase}% de{" "}
        {this.state.grossSalary}€ avec un taux de {cotisationRate}% :{" "}
        {amount.toFixed(2)}€
      </Fragment>
    )
  }

  //TODO ACY Ce serait plus simple d'ecrire ca en markdown...
  render() {
    const { paieId } = this.props

    const cotisations = this.state.cotisations
      .map(this.renderCotisation)
      .map(cotisation => <li>{cotisation}</li>)

    return (
      <Fragment>
        <Title>
          <FactWidget s={paieId} p="name" />
        </Title>
        <SubTitle>Travail effectué ce mois çi</SubTitle>
        <Card>
          L'assistante maternelle a travaillé{" "}
          <FactWidget s={paieId} p="workingHours" /> heures réparties sur{" "}
          <FactWidget s={paieId} p="workingDays" /> jours
        </Card>
        <SubTitle>Salaire brut total</SubTitle>
        <Card>
          Le taux horaire brut est de{" "}
          <FactWidget s={paieId} p="hourlyGrossRate" />€ / heure, ce qui donne
          un salaire brut total de <FactWidget s={paieId} p="hourlyGrossRate" />€{" "}
          x <FactWidget s={paieId} p="workingHours" /> heures ={" "}
          <FactWidget s={paieId} p="grossSalary" />€
        </Card>
        <SubTitle>Salaire net</SubTitle>
        <Card>
          <ul style={{ textAlign: "left" }}>{cotisations}</ul>
        </Card>
      </Fragment>
    )
  }
}

export default PaieWidget
