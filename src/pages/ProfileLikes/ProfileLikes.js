/**
 * Imports
 */

import EmptyProfileLikes from './EmptyProfileLikes'
import TileFeed from 'components/TileFeed'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <ProfileLikes/>
 */

function render ({props}) {
  const {likes, more, currentUser, user} = props

  return (
    <TileFeed activities={likes} more={more} emptyState={<EmptyProfileLikes me={currentUser} user={user} />} />
  )
}

/**
 * Exports
 */

export default summon(props => ({
  likes: `/user/${props.user._id}/likes`,
  more: pageToken => ({
    likes: {
      params: pageToken && {
        pageToken
      }
    }
  })
}))({
  render
})
