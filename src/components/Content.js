import React, {PureComponent, Fragment} from 'react'
import {prop} from 'ramda'
import store from '../store'
import PaieWidget from './PaieWidget'

class Content extends PureComponent {
  
  state = []

  componentDidMount = () => {
    const {subject} = this.props

    store.search([
      [subject, 'is', ['type']],
      [['type'], 'render', ['widget']]
    ])
    .then(results => this.setState(
      results.map(prop('widget')))
    )
  }
  
  render () {
    //TODO Instantier les widget selon les types stockés dans this.state

    return (
      <Fragment>
        <PaieWidget paieId='#11' />
      </Fragment>
    )
  }
}

export default Content
