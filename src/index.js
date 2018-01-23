import React from "react"
import ReactDOM from "react-dom"
import ReactModal from "react-modal"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import "./index.css"
import "./startup"
import "./rules"
import registerServiceWorker from "./registerServiceWorker"
import App from "./components/App"
import Facts from "./components/Facts"
import FactsGraph from "./components/FactsGraph"
import addInitialFacts from "./addInitialFacts"

ReactModal.setAppElement("#root")

addInitialFacts().then(() => {
  ReactDOM.render(
    <Router>
      <Switch>
        <Redirect
          exact
          from="/"
          to="/le projet assistante maternelle/la paie de novembre 2017"
        />
        <Route path="/debug/facts" component={Facts} />
        <Route path="/debug/graph" component={FactsGraph} />
        <Route path="/:subject/:selected" component={App} />
      </Switch>
    </Router>,
    document.getElementById("root")
  )
  registerServiceWorker()
})
