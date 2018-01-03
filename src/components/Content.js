import React, { PureComponent, Fragment } from "react"
import { identity } from "ramda"
import LoadMarkdown from "./LoadMarkdown"
import store from "../store"

class Content extends PureComponent {
  state = {}
  subscription = null

  componentDidMount = () => {
    this.update()
  }

  componentDidUpdate = () => {
    this.update()
  }

  update = () => {
    const { selected } = this.props

    if (this.subscription) {
      this.subscription.unsubscribe()
    }

    //TODO ACY au lieu d'explicitement indiquer quel composant utiliser pour le rendu,
    //préciser simplement le type et ensuite aller chercher dans src/render/<type>/index.js ?
    //Un peu comme Next.js ? https://learnnextjs.com
    this.subscription = store
      .watchSingleFact$([
        [selected, "is", ["type"]],
        [["type"], "render", ["page"]]
      ])
      .filter(identity)
      .subscribe(
        async ({ page }) => {
          const contentFile = await import("../pages/" + page)
          this.setState({ contentFile })
        },
        err => console.error(err)
      )
  }

  render() {
    if (!this.state.contentFile) return null

    return (
      <Fragment>
        <LoadMarkdown
          contentFile={this.state.contentFile}
          rootSubject={this.props.selected}
        />
      </Fragment>
    )
  }
}

export default Content
