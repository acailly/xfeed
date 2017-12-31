import React, { PureComponent } from "react"
import { identity } from "ramda"
import store from "../store"

class F extends PureComponent {
  state = { hover: false, editing: false, editingValue: undefined }

  componentDidMount = () => {
    const { s, p } = this.props

    store
      .watchSingleFact$([[s, p, ["o"]]])
      .filter(identity)
      .subscribe(
        fact => {
          this.setState({
            o: fact.o
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

    const { s, p } = this.props
    const { editingValue, o } = this.state

    const factsToRemove = []

    if (s && p && o) {
      factsToRemove.push([s, p, o])
    }

    const factsToAdd = [[s, p, editingValue]]

    store.transaction$(factsToAdd, factsToRemove).subscribe(
      () => {
        this.setState({
          hover: false,
          editing: false,
          editingValue: undefined,
          o: editingValue
        })
      },
      err => console.error(err)
    )
  }

  render() {
    const { editable } = this.props
    const { o, hover, editing } = this.state

    const label = o || "Error"

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
          editable
            ? {
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
            : {}
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

export default F
