import React, { PureComponent } from "react"
import { Timeline, TimelineEvent } from "react-event-timeline"
import { sortBy, prop } from "ramda"
import { Observable } from "rxjs/Observable"
import { Link } from "react-router-dom"
import store from "../store"

class Feed extends PureComponent {
  state = {
    projectName: "Loading",
    items: []
  }

  componentDidMount = () => {
    const { projectId } = this.props

    const fetchProjectName = store
      .watch([[projectId, "name", ["projectName"]]])
      .mergeAll()
      .take(1)
      .pluck("projectName")

    const fetchTimelineEvents = store
      .watch([
        [projectId, "contains", ["itemId"]],
        [["itemId"], "name", ["itemName"]],
        [["itemId"], "created", ["itemCreationDate"]],
        [["itemId"], "createdFormatted", ["itemCreationDateFormatted"]],
        [["itemId"], "is", ["itemType"]],
        [["itemType"], "icon", ["itemIcon"]]
      ])
      .map(sortBy(prop("itemCreationDate")))

    Observable.combineLatest(fetchProjectName, fetchTimelineEvents).subscribe(
      ([projectName, items]) => {
        this.setState({ projectName, items })
      },
      err => console.error(err)
    )
  }

  render() {
    const timelineEvents = this.state.items.map(
      ({ itemId, itemName, itemIcon, itemCreationDateFormatted }) => (
        <TimelineEvent
          key={itemId}
          title={itemName}
          createdAt={itemCreationDateFormatted}
          icon={<i className="material-icons">{itemIcon}</i>}
        />
      )
    )

    return (
      <div>
        <h1 style={{ textAlign: "center" }}>{this.state.projectName}</h1>
        <Timeline>{timelineEvents}</Timeline>
        <Link to="/facts">See facts</Link>
      </div>
    )
  }
}

export default Feed
