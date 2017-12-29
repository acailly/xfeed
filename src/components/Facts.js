import React, { Component } from "react"
import cytoscape from "cytoscape"
import cycola from "cytoscape-cola"
import { uniq, pluck, flatten, not, contains } from "ramda"
import store from "../store"

cytoscape.use(cycola)

class Facts extends Component {
  componentDidMount = () => {
    store.watch$([[["subject"], ["predicate"], ["object"]]]).subscribe(
      facts => {
        // console.log("FACTS", JSON.stringify(facts)) //DEBUG

        const subjects = uniq(pluck("subject")(facts))

        const subjectNodes = subjects.map(subject => {
          return {
            data: { id: subject, backgroundColor: "#0D0", label: subject }
          }
        })

        const edges = flatten(
          facts.map(({ subject, predicate, object }) => {
            const result = []

            let objectNodeId = object
            if (not(contains(object, subjects))) {
              objectNodeId = `${subject}[${object}]`
              const objectNode = {
                data: {
                  id: objectNodeId,
                  backgroundColor: "#00D",
                  label: object
                }
              }
              result.push(objectNode)
            }

            const edgeNode = {
              data: {
                id: `${subject}${predicate}${object}`,
                label: predicate,
                source: subject,
                target: objectNodeId
              }
            }
            result.push(edgeNode)

            return result
          })
        )

        const elements = [...subjectNodes, ...edges]

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
            "background-color": "data(backgroundColor)",
            label: "data(label)"
          }
        },

        {
          selector: "edge",
          style: {
            width: 3,
            label: "data(label)",
            color: "#666",
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "target-arrow-shape": "triangle"
          }
        }
      ],

      layout: {
        name: "cola",
        infinite: true,
        fit: false
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
