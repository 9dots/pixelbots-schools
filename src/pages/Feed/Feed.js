/**
 * Imports
 */

import PageTitle from 'components/PageTitle'
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
  render ({props}) {
    const {activities, more, currentUser} = props
    const {preferences = {}} = currentUser

    if (!preferences.group_joined) return <EmptyFeed />

    return (
      <Block w='col_main' mt mx='auto'>
        <PageTitle title='Weo' />
        <TileFeed currentUser={currentUser} activities={activities} more={more} emptyState={<EmptyFeed follow />} skip={555} />
      </Block>
    )
  }
}))
