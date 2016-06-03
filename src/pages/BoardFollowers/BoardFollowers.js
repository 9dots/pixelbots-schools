/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import EmptyState from 'components/EmptyState'
import UserTile from 'components/UserTile'
import {Grid, Block} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'
import map from '@f/map'

/**
 * <BoardFollowers/>
 */

function render ({props}) {
  const {followers, more, currentUser} = props
  const {value, loaded, loading} = followers
  if(!loaded) return <span/>

  return (
    <Block w='col_main' mx='auto' my>
      <InfiniteScroll loading={loading} more={() => value && more(value.nextPageToken)} w='calc(100% + 12px)'>
        {
          <Grid rowAlign='start'>
            {
              value.items && value.items.length
                ? map(user => <UserTile
                  currentUser={currentUser._id === user._id}
                  user={user} />, value.items)
                : <EmptyState icon='person_outline' color='green'>
                    No one is following this board yet.
                  </EmptyState>
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