/**
 * Imports
 */

import FeedWidgets from 'components/FeedWidgets'
import IntroModal from 'modals/IntroModal'
import TileFeed from 'components/TileFeed'
import {openModal} from 'reducer/modal'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

function onCreate() {
  return false && openModal(<IntroModal/>)
}

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
  activities: '/share/feed?maxResults=30',
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
