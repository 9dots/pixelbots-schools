/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import UserTile from 'components/UserTile'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Grid} from 'vdux-ui'
import map from '@f/map'

/**
 * <ProfileFollowing/>
 */

function render ({props}) {
  const {following, more, currentUser} = props
  const {value, loaded, loading} = following

  return (
    <InfiniteScroll loading={loading} more={() => value && more(value.nextPageToken)}>
      {
        <Grid>
          {
            loaded && map(user =>
              <UserTile
                currentUser={currentUser._id === user._id}
                user={user} />, value.items)
          }
        </Grid>
      }
    </InfiniteScroll>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  following: `/user/${props.user._id}/following`,
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
