import React, { Component, Fragment } from "react"
import { groupBy, sortBy, prop, sort, identity, keys, ascend } from "ramda"
import store from "../store"

//TODO ACY Ajouter des liens sur les objets si ce sont des sujets
//Exemple : une paie est sujette à la cotisation chomage
//=> ajouter un lien sur "la cotisation chomage" qui fait défiler jusqu'aux
//faits relatif au sujet "la cotisation chomage"

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
              <h2>{subject}</h2>
              <section>
                {sortedSubjectFacts.map(({ subject, predicate, object }) => {
                  return (
                    <div key={subject + predicate + object}>
                      {subject} {predicate} {object}
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
