/**
 * Imports
 */

import FeedWidgets from 'components/FeedWidgets'
import PageTitle from 'components/PageTitle'
import IntroModal from 'modals/IntroModal'
import TileFeed from 'components/TileFeed'
import ClassActivityRow from 'components/ClassActivityRow'
import RowFeed from 'components/RowFeed'
import {openModal} from 'reducer/modal'
import EmptyFeed from './EmptyFeed'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

/**
 * onCreate
 */

function onCreate ({props}) {
  const {currentUser} = props
  const {preferences = {}, userType} = currentUser
  const {slideshow = {}} = preferences

  if (!slideshow.done) {
    return openModal(() => <IntroModal currentUser={currentUser} />)
  }
}

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
        <TileFeed columns={3} currentUser={currentUser} activities={activities} more={more} emptyState={<EmptyFeed follow />} skip={555} m='-8px 0 0 -6px'>
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
  onCreate,
  render
})
