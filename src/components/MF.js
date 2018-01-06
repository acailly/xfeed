import React, { PureComponent } from "react"
import { complement, isEmpty, pluck, join } from "ramda"
import { Markdown } from "react-showdown"
import template from "es6-template-strings"
import store from "../store"
import F from "./F"

//https://developer.mozilla.org/fr/docs/D%C3%A9coder_encoder_en_base64#Premi%C3%A8re_solution_%E2%80%93_%C3%A9chapper_la_cha%C3%AEne_avant_de_l'encoder
const decodeFromBase64 = str => decodeURIComponent(escape(window.atob(str)))

class MF extends PureComponent {
  state = {}

  componentDidMount = () => {
    const { s, p } = this.props

    store
      .watchAll$([[s, p, ["o"]]])
      .filter(complement(isEmpty))
      .subscribe(
        results => {
          const objects = pluck("o")(results)
          this.setState({
            objects
          })
        },
        err => console.error(err)
      )
  }

  render() {
    const { children } = this.props
    const { objects } = this.state

    const decodedChildren = decodeFromBase64(children)
      //https://github.com/showdownjs/showdown/wiki/extensions#gotchas
      .replace(/¨D/g, "$")

    if (!objects || isEmpty(objects)) return null

    const aggregatedContent = join("\n")(
      objects.map(o => {
        const resolvedContent = template(
          decodedChildren,
          {
            ...this.props,
            o
          },
          { partial: true }
        )
        return resolvedContent
      })
    )

    return (
      <Markdown
        markup={aggregatedContent}
        components={{ F, MF }}
        extensions={[]}
      />
    )
  }
}

export default MF
