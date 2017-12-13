import React, {PureComponent, Fragment} from 'react'
import store from '../store'

class FactWidget extends PureComponent {

  state = {}

  componentDidMount = () => {
    const {s, p, o} = this.props

    const subject = s || ['subject']
    const predicate = p || ['predicate']
    const object = o || ['object']

    store.search([
      [subject, predicate, object]
    ])
    .then(([fact, ...rest]) => this.setState({
      subject: s? undefined : fact.subject,
      predicate: p? undefined : fact.predicate,
      object: o? undefined : fact.object
    }))
  }

  render () {
    const {subject, predicate, object} = this.state

    const label = subject || predicate || object || 'Error'

    return (
      <Fragment>
        {label}
      </Fragment>
    ) 
  }
}

export default FactWidget
