/**
 * Imports
 */

import FeedWidgets from 'components/FeedWidgets'
import PageTitle from 'components/PageTitle'
import IntroModal from 'modals/IntroModal'
import TileFeed from 'components/TileFeed'
import {component, element} from 'vdux'
import EmptyFeed from './EmptyFeed'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

/**
 * <Feed/>
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
}))(component({
  onCreate ({context, props}) {
    const {currentUser} = props
    const {preferences = {}} = currentUser
    const {slideshow = {}} = preferences

    if (!slideshow.done) {
      return context.openModal(() => <IntroModal currentUser={currentUser} />)
    }
  },

  render ({props}) {
    const {activities, more, currentUser} = props
    const {preferences = {}} = currentUser

    if (!preferences.group_joined) return <EmptyFeed />

    return (
      <Block w='col_main' mt mx='auto'>
        <PageTitle title='Weo' />
        <TileFeed currentUser={currentUser} activities={activities} more={more} emptyState={<EmptyFeed follow />} skip={555}>
          <FeedWidgets user={currentUser} />
        </TileFeed>
      </Block>
    )
  }
}))
