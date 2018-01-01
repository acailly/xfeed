import React, { Component } from "react"
import Feed from "./Feed"
import Content from "./Content"

class App extends Component {
  componentDidCatch(error, info) {
    console.error(error)
  }

  render() {
    const { subject, selected } = this.props.match.params

    return (
      <div
        style={{
          background: "lightgray",
          margin: "0px",
          padding: "0px",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "stretch"
        }}
      >
        <div
          style={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Feed subject={subject} selected={selected} />
        </div>
        <div
          style={{
            background: "white",
            flex: "2 1 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            overflow: "auto",
            paddingLeft: "30px",
            paddingRight: "30px"
          }}
        >
          <Content selected={selected} />
        </div>
      </div>
    )
  }
}

export default App
