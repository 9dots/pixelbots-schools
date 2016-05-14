/**
 * Imports
 */

import FeedWidgets from 'components/FeedWidgets'
import TileFeed from 'components/TileFeed'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

/**
 * Following feed
 */

function render ({props}) {
  const {activities, more, currentUser} = props

  return (
    <Block w='col_main' mt={12} mx='auto'>
      <TileFeed activities={activities} more={more}>
        <FeedWidgets user={currentUser}/>
      </TileFeed>
    </Block>
  )
}


/**
 * Exports
 */

export default summon(props => ({
  activities: '/share/feed?maxResults=10',
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
