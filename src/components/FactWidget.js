import React, {PureComponent} from 'react'
import store from '../store'

class FactWidget extends PureComponent {

  state = {}

  componentDidMount = () => {
    const {widgetId} = this.props

    store.search([
      [widgetId, 'own', ['factId']]
    ])
    .then(([{factId}, ...rest]) => store.getFact(factId))
    .then(({subject, predicate, object}) => this.setState({subject, predicate, object}))
  }

  render () {
    return (
      <div style={{backgroundColor: 'white', textAlign: 'center', margin: '5px', padding: '10px'}}>
        {`${this.state.subject} ${this.state.predicate} ${this.state.object}`}
      </div>
    ) 
  }
}

export default FactWidget
