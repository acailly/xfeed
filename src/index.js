import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import "./rxjs-operators"
import App from "./components/App"
import Facts from "./components/Facts"
import onStartup from "./onStartup"

onStartup().then(() => {
  ReactDOM.render(
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/facts" component={Facts} />
      </div>
    </Router>,
    document.getElementById("root")
  )
  registerServiceWorker()
})
