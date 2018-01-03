import React, { PureComponent } from "react"
import ReactModal from "react-modal"
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

  handleValidateEdition = event => {
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

  handleCancelEdition = () => {
    this.setState({
      hover: false,
      editing: false,
      editingValue: undefined
    })
  }

  render() {
    const { editable } = this.props
    const { o, hover, editing } = this.state

    const label = o || <b>?</b>

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
        title={editable ? "Click to edit" : ""}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {label}
        <ReactModal
          isOpen={editing}
          style={{
            content: {
              position: "fixed",
              top: undefined,
              left: 0,
              right: 0,
              bottom: 0,
              height: 30,
              borderRadius: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          <form onSubmit={this.handleValidateEdition}>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <input type="submit" style={{ display: "none" }} />
          </form>
          <button onClick={this.handleValidateEdition}>Validate</button>
          <button onClick={this.handleCancelEdition}>Cancel</button>
        </ReactModal>
      </span>
    )
  }
}

export default F
