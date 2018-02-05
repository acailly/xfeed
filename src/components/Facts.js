import React, { Component, Fragment } from "react"
import {
  groupBy,
  sortBy,
  prop,
  sort,
  identity,
  keys,
  ascend,
  contains
} from "ramda"
import store from "../store"

class Facts extends Component {
  state = { facts: [] }

  componentDidMount = () => {
    store
      .watchAll$([[["subject"], ["predicate"], ["object"]]])
      .do(facts => {
        const factsGroupedBySubject = groupBy(prop("subject"))(facts)
        this.setState({ factsGroupedBySubject })
      })
      .catch(err => console.error(err))
      .subscribe()
  }

  render() {
    const sortedSubjects = sort(ascend(identity))(
      keys(this.state.factsGroupedBySubject)
    )

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
