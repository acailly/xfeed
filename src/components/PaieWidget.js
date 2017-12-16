import React, { PureComponent, Fragment } from "react"
import Card from "./Card"
import Title from "./Title"
import SubTitle from "./SubTitle"
import FactWidget from "./FactWidget"

class PaieWidget extends PureComponent {
  //TODO ACY Ce serait plus simple d'ecrire ca en markdown...

  render() {
    const { paieId } = this.props
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
          un salaire brut total de <FactWidget s={paieId} p="grossSalary" />€ (<FactWidget
            s={paieId}
            p="hourlyGrossRate"
          />{" "}
          x <FactWidget s={paieId} p="workingHours" />)
        </Card>
      </Fragment>
    )
  }
}

export default PaieWidget
