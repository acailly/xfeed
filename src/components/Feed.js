import React, { PureComponent } from "react"
import { Timeline, TimelineEvent } from "react-event-timeline"
import { sortBy, prop } from "ramda"
import { Observable } from "rxjs/Observable"
import { Link } from "react-router-dom"
import { withRouter } from "react-router"
import store from "../store"

class Feed extends PureComponent {
  state = {
    projectName: "Loading",
    items: []
  }

  componentDidMount = () => {
    const { subject } = this.props

    const fetchSubjectName = store
      .watchEach$([[subject, "a pour nom", ["subjectName"]]])
      .pluck("subjectName")

    const fetchTimelineEvents = store
      .watchAll$([
        [subject, "contient", ["itemId"]],
        [["itemId"], "a pour nom", ["itemName"]],
        [["itemId"], "a pour date de création", ["itemCreationDate"]],
        [
          ["itemId"],
          "a pour date de création (formatté)",
          ["itemCreationDateFormatted"]
        ],
        [["itemId"], "est", ["itemType"]],
        [["itemType"], "a pour icône", ["itemIcon"]]
      ])
      .map(sortBy(prop("itemCreationDate")))

    Observable.combineLatest(fetchSubjectName, fetchTimelineEvents).subscribe(
      ([subjectName, items]) => {
        this.setState({ subjectName, items })
      },
      err => console.error(err)
    )
  }

  render() {
    const { history, subject, selected } = this.props

    const timelineEvents = this.state.items.map(
      ({ itemId, itemName, itemIcon, itemCreationDateFormatted }) => {
        const isSelected = itemId === selected
        return (
          <TimelineEvent
            key={itemId}
            title={itemName}
            bubbleStyle={{
              backgroundColor: isSelected ? "lightgreen" : "white"
            }}
            style={{ cursor: "pointer" }}
            createdAt={itemCreationDateFormatted}
            icon={<i className="material-icons">{itemIcon}</i>}
            onClick={() =>
              /** TODO ACY Ca ne rafraichit pas la page, ca a l'air d'être au niveau du composant <Markdown> **/ history.push(
                `/${subject}/${itemId}`
              )
            }
          />
        )
      }
    )

    return (
      <div>
        <h1 style={{ textAlign: "center" }}>{this.state.subjectName}</h1>
        <Timeline>{timelineEvents}</Timeline>
        <Link to="/debug/facts">See facts</Link>
      </div>
    )
  }
}

export default withRouter(Feed)
