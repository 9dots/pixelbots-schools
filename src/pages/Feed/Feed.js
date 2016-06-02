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

function onCreate ({props}) {
  const {currentUser} = props
  const {preferences = {}} = currentUser
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

  return (
    <Block w='col_main' mt mx='auto'>
      <TileFeed activities={activities} more={more}>
        {
          activities.loaded && <FeedWidgets user={currentUser}/>
        }
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
