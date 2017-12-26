import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./index.css"
import "./startup"
import registerServiceWorker from "./registerServiceWorker"
import App from "./components/App"
import Facts from "./components/Facts"
import addInitialFacts from "./addInitialFacts"

addInitialFacts().then(() => {
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
