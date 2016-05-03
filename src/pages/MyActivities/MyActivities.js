/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import ActivityRow from 'components/ActivityRow'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

/**
 * <MyActivities/> page
 */

function render ({props}) {
  const {activities, boards = [], currentUser, more} = props
  const {value, loading} = activities

  return (
    <Block>
      <InfiniteScroll more={() => more(value && value.nextPageToken)}>
        {
          loading || value.items.map(activity => <ActivityRow activity={activity} />)
        }
      </InfiniteScroll>
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
