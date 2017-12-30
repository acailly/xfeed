import React, { PureComponent, Fragment } from "react"
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

    store
      .watchFacts$([
        ["paie", "cotisation", ["cotisationId"]],
        [["cotisationId"], "name", ["cotisationName"]],
        [["cotisationId"], "base", ["cotisationBase"]],
        [["cotisationId"], "rate", ["cotisationRate"]],
        [paieId, ["cotisationName"], ["cotisationAmount"]],
        [paieId, "grossSalary", ["grossSalary"]]
      ])
      .subscribe(
        cotisations => {
          this.setState({ cotisations })
        },
        err => console.error(err)
      )
  }

  renderCotisation = ({
    cotisationId,
    cotisationName,
    cotisationBase,
    cotisationRate,
    cotisationAmount,
    grossSalary
  }) => {
    return (
      <li key={cotisationId}>
        La cotisation <b>{cotisationName}</b> s'applique sur {cotisationBase}%
        de {grossSalary}€ avec un taux de {cotisationRate}% :{" "}
        {(+cotisationAmount).toFixed(2)}€
      </li>
    )
  }

  //TODO ACY Ce serait plus simple d'ecrire ca en markdown...
  render() {
    const { paieId } = this.props

    const cotisations = this.state.cotisations.map(this.renderCotisation)

    return (
      <Fragment>
        <Title>
          <FactWidget s={paieId} p="name" />
        </Title>
        <SubTitle>Travail effectué ce mois çi</SubTitle>
        <Card>
          L'assistante maternelle a travaillé{" "}
          <FactWidget s={paieId} p="workingHours" editable /> heures réparties
          sur <FactWidget s={paieId} p="workingDays" editable /> jours
        </Card>
        <SubTitle>Salaire brut total</SubTitle>
        <Card>
          Le taux horaire brut est de{" "}
          <FactWidget s={paieId} p="hourlyGrossRate" editable />€ / heure, ce
          qui donne un salaire brut total de{" "}
          <FactWidget s={paieId} p="hourlyGrossRate" />€ x{" "}
          <FactWidget s={paieId} p="workingHours" /> heures ={" "}
          <FactWidget s={paieId} p="grossSalary" />€
        </Card>
        <SubTitle>Salaire net</SubTitle>
        <Card>
          <ul style={{ textAlign: "left" }}>{cotisations}</ul>
        </Card>
        <Card>
          Le montant total des cotisations s'élève à{" "}
          <FactWidget s={paieId} p="totalCotisationAmountFormatted" />€, ce qui
          donne un salaire net de <FactWidget s={paieId} p="grossSalary" />€ -{" "}
          <FactWidget s={paieId} p="totalCotisationAmountFormatted" />€ ={" "}
          <FactWidget s={paieId} p="netSalaryFormatted" />€
        </Card>
      </Fragment>
    )
  }
}

export default PaieWidget
