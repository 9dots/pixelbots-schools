/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import TileFeed from 'components/TileFeed'
import FeedWidgets from 'components/FeedWidgets'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

/**
 * Following feed
 */

function render ({props}) {
  const {following, more, currentUser} = props
  const {value, loaded} = following

  return (
    <Block>
      <InfiniteScroll more={() => more(value && value.nextPageToken)}>
        <Block w='col_main' mt={12} mx='auto'>
          {
            loaded
              ? <TileFeed items={value.items}><FeedWidgets user={currentUser}/></TileFeed>
              : <span>Loading...</span>
          }
        </Block>
      </InfiniteScroll>
    </Block>
  )
}


/**
 * Exports
 */

export default summon(props => ({
  following: '/share/feed?maxResults=10',
  more: pageToken => ({
    following: {
      params: {
        pageToken
      }
    }
  })
}))({
  render
})
