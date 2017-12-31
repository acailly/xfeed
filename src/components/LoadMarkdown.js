import React, { PureComponent } from "react"
import { Markdown } from "react-showdown"
import template from "es6-template-strings"
import F from "./F"
import MF from "./MF"

class LoadMarkdown extends PureComponent {
  state = {}

  componentDidMount() {
    this.updateContent()
  }

  componentDidUpdate() {
    this.updateContent()
  }

  updateContent = () => {
    const { contentFile } = this.props

    if (contentFile !== this.state.contentFile) {
      fetch(contentFile)
        .then(response => response.text())
        .then(content => {
          this.setState({
            contentFile,
            content
          })
        })
    }
  }

  render() {
    const resolvedContent = template(
      this.state.content,
      {
        rootSubject: this.props.rootSubject
      },
      { partial: true }
    )
    return (
      <Markdown
        markup={resolvedContent}
        components={{ F, MF }}
        extensions={["encodeMFContent"]}
      />
    )
  }
}

export default LoadMarkdown
