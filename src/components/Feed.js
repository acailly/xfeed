import React, { PureComponent } from "react"
import { Timeline, TimelineEvent } from "react-event-timeline"
import { sortBy, prop } from "ramda"
import store from "../store"

class Feed extends PureComponent {
  state = {
    projectName: "Loading",
    items: []
  }

  componentDidMount = () => {
    const { projectId } = this.props

    const fetchProjectName = store
      .search([[projectId, "name", ["projectName"]]])
      .then(([{ projectName }, ...rest]) => projectName)

    const fetchTimelineEvents = store
      .search([
        [projectId, "contains", ["itemId"]],
        [["itemId"], "name", ["itemName"]],
        [["itemId"], "created", ["itemCreationDate"]],
        [["itemId"], "createdFormatted", ["itemCreationDateFormatted"]],
        [["itemId"], "is", ["itemType"]],
        [["itemType"], "icon", ["itemIcon"]]
      ])
      .then(items => sortBy(prop("itemCreationDate"))(items))

    Promise.all([fetchProjectName, fetchTimelineEvents])
      .then(([projectName, items]) => {
        this.setState({ projectName, items })
      })
      .catch(err => console.error(err))
  }

  render() {
    const timelineEvents = this.state.items.map(
      ({ itemId, itemName, itemIcon, itemCreationDateFormatted }) => (
        <TimelineEvent
          key={itemId}
          title={itemName}
          createdAt={itemCreationDateFormatted}
          icon={<i className="material-icons md-18">{itemIcon}</i>}
        />
      )
    )

    return (
      <div>
        <h1 style={{ textAlign: "center" }}>{this.state.projectName}</h1>
        <Timeline>{timelineEvents}</Timeline>
      </div>
    )
  }
}

export default Feed
