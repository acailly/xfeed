import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import "./rxjs-operators"
import App from "./components/App"
import onStartup from "./onStartup"

onStartup().then(() => {
  ReactDOM.render(<App />, document.getElementById("root"))
  registerServiceWorker()
})
