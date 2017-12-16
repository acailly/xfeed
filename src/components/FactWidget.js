import React, { PureComponent, Fragment } from "react"
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
      .mergeAll()
      .take(1)
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

    return <Fragment>{label}</Fragment>
  }
}

export default FactWidget
