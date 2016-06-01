/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import UserTile from 'components/UserTile'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Grid, Block} from 'vdux-ui'
import map from '@f/map'

/**
 * <BoardFollowers/>
 */

function render ({props}) {
  const {followers, more, currentUser} = props
  const {value, loaded, loading} = followers

  return (
    <Block w='col_main' mx='auto' my>
      <InfiniteScroll loading={loading} more={() => value && more(value.nextPageToken)} w='calc(100% + 12px)'>
        {
          <Grid rowAlign='start'>
            {
              loaded && map(user =>
                <UserTile
                  currentUser={currentUser._id === user._id}
                  user={user} />, value.items)
            }
          </Grid>
        }
      </InfiniteScroll>
    </Block>
  )
}

/**
 * Exports
 */

export default summon(({boardId}) => ({
  followers: `/board/${boardId}/followers?maxResults=20`,
  more: pageToken => ({
    followers: {
      params: pageToken && {
        pageToken
      }
    }
  })
}))({
  render
})