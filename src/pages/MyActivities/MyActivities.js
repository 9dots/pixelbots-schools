/**
 * Imports
 */

import RowFeed from 'components/RowFeed'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

/**
 * <MyActivities/> page
 */

function render ({props}) {
  const {activities, boards = [], more} = props
  const {value, loading} = activities

  return (
    <Block>
      {
        loading || <RowFeed items={value.items} more={() => more(value && value.nextPageToken)} />
      }
    </Block>
  )
}

/**
 * Helpers
 */

function boards (user) {
  return user.groups.filter(group => group.groupType === 'board')
}

/**
 * Exports
 */

export default summon(props => ({
  activities: `/share?channel=${
    boards(props.currentUser)
      .map(board => 'group!' + board.id + '.activities')
      .join(',')
    }&maxResults=20`,
  more: pageToken => ({
    activities: {
      fragment: pageToken && `&pageToken=${pageToken}`
    }
  })
}), {
  render
})
