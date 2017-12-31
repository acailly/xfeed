import React, { PureComponent, Fragment } from "react"
import { prop } from "ramda"
import LoadMarkdown from "./LoadMarkdown"
import store from "../store"
import paieWidgetMarkdown from "../pages/PaieWidget.md"

class Content extends PureComponent {
  state = null

  componentDidMount = () => {
    const { subject } = this.props

    store
      .searchFacts$([
        [subject, "is", ["type"]],
        [["type"], "render", ["widget"]]
      ])
      .subscribe(
        results => this.setState(results.map(prop("widget"))),
        err => console.error(err)
      )
  }

  render() {
    //TODO Instantier les widget selon les types stockés dans this.state

    return (
      <Fragment>
        <LoadMarkdown
          contentFile={paieWidgetMarkdown}
          rootSubject="#paieOctobre"
        />
      </Fragment>
    )
  }
}

export default Content
