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
  const {activities, boards = [], more, search} = props
  const {value, loading} = activities

  return (
    <Block>
      {
        loading || <RowFeed items={value.items} more={() => more(value && value.nextPageToken)} search={search} />
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
  activities: `/share?${
    boards(props.currentUser)
      .map(board => 'channel=group!' + board.id + '.board')
      .join('&')
    }&maxResults=20`,
  more: pageToken => ({
    activities: {
      pageToken
    }
  }),
  search: query => ({
    activities: {
      params: {
        query
      }
    }
  })
}), {
  render
})
