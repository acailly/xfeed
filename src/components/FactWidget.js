import React, { PureComponent } from "react"
import { nth, complement, isEmpty } from "ramda"
import store from "../store"

class FactWidget extends PureComponent {
  state = {}

  componentDidMount = () => {
    const { s, p, o } = this.props

    const subject = s || ["_subject_"]
    const predicate = p || ["_predicate_"]
    const object = o || ["_object_"]

    store
      .watch([[subject, predicate, object]])
      .filter(complement(isEmpty))
      .map(nth(0))
      .subscribe(
        fact => {
          this.setState({
            subject: s ? undefined : fact._subject_,
            predicate: p ? undefined : fact._predicate_,
            object: o ? undefined : fact._object_
          })
        },
        err => console.error(err)
      )
  }

  render() {
    const { subject, predicate, object } = this.state

    const label = subject || predicate || object || "Error"

    return (
      <span
        style={{
          borderColor: "lightblue",
          borderWidth: "1px",
          borderStyle: "solid",
          paddingLeft: "5px",
          paddingRight: "5px",
          marginLeft: "5px",
          marginRight: "5px"
        }}
      >
        {label}
      </span>
    )
  }
}

export default FactWidget
