import React, { PureComponent } from "react"
import { nth, complement, isEmpty } from "ramda"
import store from "../store"

class FactWidget extends PureComponent {
  state = { hover: false, editing: false, editingValue: undefined }

  componentDidMount = () => {
    const { s, p, o } = this.props

    const subject = s || ["_subject_"]
    const predicate = p || ["_predicate_"]
    const object = o || ["_object_"]

    store
      .watch$([[subject, predicate, object]])
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

  handleClick = () => {
    this.setState({ editing: true })
  }

  handleChange = event => {
    this.setState({ editingValue: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { s, p, o } = this.props
    const { editingValue, subject, predicate, object } = this.state

    const factsToRemove = []

    const oldSubject = s || subject
    const oldPredicate = p || predicate
    const oldObject = o || object

    if (oldSubject && oldPredicate && oldObject) {
      factsToRemove.push([oldSubject, oldPredicate, oldObject])
    }

    const factsToAdd = []

    let newSubject = oldSubject
    let newPredicate = oldPredicate
    let newObject = oldObject
    if (!s) {
      newSubject = editingValue
    } else if (!p) {
      newPredicate = editingValue
    } else if (!o) {
      newObject = editingValue
    } else {
      throw new Error("Error")
    }

    factsToAdd.push([newSubject, newPredicate, newObject])

    store.transaction(factsToAdd, factsToRemove).subscribe(
      () => {
        this.setState({
          hover: false,
          editing: false,
          editingValue: undefined,
          subject: s ? undefined : newSubject,
          predicate: p ? undefined : newPredicate,
          object: o ? undefined : newObject
        })
      },
      err => console.error(err)
    )
  }

  render() {
    const { editable } = this.props
    const { subject, predicate, object, hover, editing } = this.state

    const label = subject || predicate || object || "Error"

    //TODO Mettre l'édition dans une popup
    const editingForm = (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <input type="submit" style={{ display: "none" }} />
      </form>
    )

    const backgroundColor =
      hover && editable && !editing ? "rgb(32, 156, 238)" : undefined
    const color = hover && editable && !editing ? "white" : undefined
    const handleMouseEnter =
      editable && !editing ? this.handleMouseEnter : undefined
    const handleMouseLeave =
      editable && !editing ? this.handleMouseLeave : undefined
    const handleClick = editable && !editing ? this.handleClick : undefined

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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {!editing && label}
        {editing && editingForm}
      </span>
    )
  }
}

export default FactWidget
