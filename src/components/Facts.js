import React, { Component, Fragment } from "react"
import {
  groupBy,
  sortBy,
  prop,
  identity,
  keys,
  ascend,
  contains,
  map,
  sortWith
} from "ramda"
import store from "../store"

class Facts extends Component {
  state = { facts: [] }

  componentDidMount = () => {
    store
      .watchAll$([[["subject"], ["predicate"], ["object"]]])
      .do(facts => {
        const objects = map(prop("object"), facts)
        const factsGroupedBySubject = groupBy(prop("subject"))(facts)
        this.setState({ factsGroupedBySubject, objects })
      })
      .catch(err => console.error(err))
      .subscribe()
  }

  render() {
    const isSubjectReferencedByAnotherSubject = subject =>
      contains(subject, this.state.objects)

    const subjectSort = sortWith([
      ascend(isSubjectReferencedByAnotherSubject),
      ascend(identity)
    ])

    const sortedSubjects = subjectSort(keys(this.state.factsGroupedBySubject))

    return (
      <article>
        {sortedSubjects.map(subject => {
          const subjectFacts = this.state.factsGroupedBySubject[subject]
          const sortedSubjectFacts = sortBy(prop("predicate"))(subjectFacts)

          return (
            <Fragment key={subject}>
              <h2 id={subject}>{subject}</h2>
              <section>
                {sortedSubjectFacts.map(({ subject, predicate, object }) => {
                  const objectIsReferencingAnotherSubject = contains(
                    object,
                    sortedSubjects
                  )
                  const formattedObject = objectIsReferencingAnotherSubject ? (
                    <a href={`#${object}`}>{object}</a>
                  ) : (
                    object
                  )

                  return (
                    <div key={subject + predicate + object}>
                      {subject} {predicate} {formattedObject}
                    </div>
                  )
                })}
              </section>
            </Fragment>
          )
        })}
      </article>
    )
  }
}

export default Facts
