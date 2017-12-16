import React, { Component } from "react"
import Feed from "./Feed"
import Content from "./Content"

class App extends Component {
  render() {
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
          <Feed projectId="#1" />
        </div>
        <div
          style={{
            background: "lightgreen",
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch"
          }}
        >
          <Content />
        </div>
      </div>
    )
  }
}

export default App
