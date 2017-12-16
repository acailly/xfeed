import React, { PureComponent } from "react"
import Card from "./Card"
import FactWidget from "./FactWidget"

class PaieWidget extends PureComponent {
  render() {
    const { paieId } = this.props
    return (
      <Card>
        Le salaire payé en <FactWidget s={paieId} p="month" /> est{" "}
        <FactWidget s={paieId} p="salary" />
      </Card>
    )
  }
}

export default PaieWidget
