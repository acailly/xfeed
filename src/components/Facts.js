import React, { Component } from "react"
import cytoscape from "cytoscape"
import coseBilkent from "cytoscape-cose-bilkent"
import { nth, uniq, pluck } from "ramda"
import store from "../store"

cytoscape.use(coseBilkent)

class Facts extends Component {
  componentDidMount = () => {
    store.watch([[["subject"], ["predicate"], ["object"]]]).subscribe(
      facts => {
        const subjectNodes = uniq(pluck("subject")(facts)).map(subject => {
          return {
            data: { id: subject }
          }
        })

        const objectNodes = uniq(pluck("object")(facts)).map(object => {
          return {
            data: { id: object }
          }
        })

        const edges = facts.map(({ subject, predicate, object }) => {
          return {
            data: {
              id: `${subject}${predicate}${object}`,
              source: subject,
              target: object
            }
          }
        })

        const elements = [...subjectNodes, ...objectNodes, ...edges]

        this.setState({
          elements
        })
      },
      err => console.error(err)
    )
  }

  componentDidUpdate = () => {
    if (this.cytoscape) {
      this.cytoscape.destroy()
      this.cytoscape = null
    }

    this.cytoscape = cytoscape({
      container: this.cytoscapeElement, // container to render in

      elements: this.state.elements,

      style: [
        // the stylesheet for the graph
        {
          selector: "node",
          style: {
            "background-color": "#666",
            label: "data(id)"
          }
        },

        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "target-arrow-shape": "triangle"
          }
        }
      ],

      layout: {
        name: "cose-bilkent",
        idealEdgeLength: 300,
        nodeOverlap: 40000
      }
    })
  }

  render() {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh"
        }}
        ref={elem => {
          this.cytoscapeElement = elem
        }}
      />
    )
  }
}

export default Facts
