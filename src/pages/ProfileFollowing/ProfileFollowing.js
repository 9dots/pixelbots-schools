/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import EmptyProfileFollowing from './EmptyProfileFollowing'
import UserTile from 'components/UserTile'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Grid} from 'vdux-ui'
import map from '@f/map'

/**
 * <ProfileFollowing/>
 */

function render ({props}) {
  const {following, more, currentUser, user} = props
  const {value, loaded, loading} = following

  return (
    <InfiniteScroll loading={loading} more={() => value && more(value.nextPageToken)} w='calc(100% + 12px)'>
      {
        <Grid>
          {
            loaded && renderItems(currentUser, user, value.items)
          }
        </Grid>
      }
    </InfiniteScroll>
  )
}

function renderItems(me, profUser, items) {
  return (
    items && items.length
      ? map(user => <UserTile currentUser={me._id === user._id} user={user} />, items)
      : <EmptyProfileFollowing me={me} user={profUser} />
  )
}

/**
 * Exports
 */

export default summon(({user}) => ({
  following: `/user/${user._id}/following?maxResults=20`,
  more: pageToken => ({
    following: {
      params: pageToken && {
        pageToken
      }
    }
  })
}))({
  render
})
