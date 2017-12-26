import React, { PureComponent } from "react"
import { nth, complement, isEmpty } from "ramda"
import store from "../store"

class FactWidget extends PureComponent {
  state = { hover: false }

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

  handleMouseEnter = () => {
    this.setState({ hover: true })
  }

  handleMouseLeave = () => {
    this.setState({ hover: false })
  }

  render() {
    const { editable } = this.props
    const { subject, predicate, object, hover } = this.state

    const label = subject || predicate || object || "Error"

    const backgroundColor = hover ? "rgb(32, 156, 238)" : undefined
    const color = hover ? "white" : undefined

    return (
      <span
        style={
          editable && {
            borderColor: "rgb(32, 156, 238)",
            borderWidth: "1px",
            borderStyle: "solid",
            paddingLeft: "5px",
            paddingRight: "5px",
            marginLeft: "5px",
            marginRight: "5px",
            borderRadius: "3px",
            backgroundColor,
            color,
            cursor: "pointer"
          }
        }
        onMouseEnter={editable && this.handleMouseEnter}
        onMouseLeave={editable && this.handleMouseLeave}
      >
        {label}
      </span>
    )
  }
}

export default FactWidget
