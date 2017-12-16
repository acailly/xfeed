import React, { PureComponent } from "react"
import FactWidget from "./FactWidget"

class PaieWidget extends PureComponent {
  render() {
    const { paieId } = this.props
    return (
      <div
        style={{
          backgroundColor: "white",
          textAlign: "center",
          margin: "5px",
          padding: "10px"
        }}
      >
        Le salaire payé en <FactWidget s={paieId} p="mois" /> est{" "}
        <FactWidget s={paieId} p="salaire" />
      </div>
    )
  }
}

export default PaieWidget
