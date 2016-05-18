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
 * <ProfileFollowers/>
 */

function render ({props}) {
  const {followers, more, currentUser} = props
  const {value, loaded, loading} = followers

  return (
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
  )
}
/**
 * Exports
 */

export default summon(props => ({
  followers: `/user/${props.user._id}/followers`,
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
