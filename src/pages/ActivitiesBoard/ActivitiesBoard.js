/**
 * Imports
 */

import RowFeed from 'components/RowFeed'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

/**
 * <ActivitiesBoard/> page
 */

function render ({props}) {
  const {activities, more} = props
  const {loading, value} = activities

  return (
    <Block>
      {
        loading || <RowFeed items={value.items} more={() => more(value && value.nextPageToken)} />
      }
    </Block>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  activities: `/share?channel=group!${props.boardId}.board&maxResults=20`,
  more: pageToken => ({
    activities: {
      fragment: pageToken && `&pageToken=${pageToken}`
    }
  })
}), {
  render
})
