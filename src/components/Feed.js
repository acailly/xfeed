import React from 'react'
import {Timeline, TimelineEvent} from 'react-event-timeline'
import store from '../store'

const Feed = ({projectId}) => {
  const projectName = store
    .find([
      [projectId, 'name', ['projectName']]
    ])[0]
    .projectName

  const timelineEvents =
    store
    .find([
      [projectId, 'contains', ['itemId']],
      [['itemId'], 'name', ['itemName']],
      [['itemId'], 'created', ['itemCreationDate']],
      [['itemId'], 'icon', ['itemIcon']]
    ])
    .map(({itemId, itemName, itemIcon, itemCreationDate}) =>
      <TimelineEvent
        key={itemId}
        title={itemName}
        createdAt={itemCreationDate}
        icon={<i className='material-icons md-18'>{itemIcon}</i>}
      />
    )

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>{projectName}</h1>
      <Timeline>
        {timelineEvents}
      </Timeline>
    </div>
  )
}

export default Feed
