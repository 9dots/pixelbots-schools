/**
 * Imports
 */

import FeedWidgets from 'components/FeedWidgets'
import PageTitle from 'components/PageTitle'
import TileFeed from 'components/TileFeed'
import ClassActivityRow from 'components/ClassActivityRow'
import RowFeed from 'components/RowFeed'
import EmptyFeed from './EmptyFeed'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

/**
 * Following feed
 */

function render ({props}) {
  const {activities, more, currentUser} = props
  const {preferences = {}, userType} = currentUser
  const {loaded, value} = activities

  if (!preferences.group_joined) return <EmptyFeed  />

  return (
    <Block w='col_main' mx='auto'>
      <PageTitle title='Weo' />
        <TileFeed columns={3} currentUser={currentUser} activities={activities} more={more} w={720} emptyState={<EmptyFeed follow />} skip={555} m='-8px 0 0 -6px'>
        </TileFeed>
    </Block>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  activities: {
    url: '/share/feed?maxResults=32',
    subscribe: 'activity_feed'
  },
  more: pageToken => ({
    activities: {
      params: pageToken && {
        pageToken
      }
    }
  })
}))({
  render
})
