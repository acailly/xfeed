import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./components/App"
import registerServiceWorker from "./registerServiceWorker"
import onStartup from "./onStartup"

onStartup().then(() => {
  ReactDOM.render(<App />, document.getElementById("root"))
  registerServiceWorker()
})
