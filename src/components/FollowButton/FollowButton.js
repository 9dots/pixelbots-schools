/**
 * Imports
 */

import summon, {invalidate} from 'vdux-summon'
import {Button} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <FollowButton/>
 */

function render ({props}) {
  const {isFollowing, follow, unfollow, board, user, ...rest} = props
  const {loading, value, reload} = isFollowing
  const noun = board ? 'Board' : ''
  const verb = loading && !reload
    ? ''
    : value ? 'Unfollow' : 'Follow'
  return (
    <Button
      onClick={(value ? unfollow : follow)}
      disabled={loading}
      color={value ? 'midgray' : 'blue'}
      px={25}
      rounded
      bgColor='off_white'
      hoverProps={{highlight: 0.03}}
      focusProps={{highlight: 0.03}}
      border='1px solid rgba(0,0,0,0.15)'
      {...rest}>
      {verb} {noun}
    </Button>
  )
}

/**
 * Exports
 */

export default summon(props => {
  const {board, user} = props

  const id = board ? board._id : user._id
  const type = board ? 'board' : 'user'

  const url = `/${type}/${id}/follow`
  const subscribe = type === 'board'
    ? 'follow:user'
    : undefined

  const invalidates = type === 'user'
    ? 'follow:user'
    : undefined

  return {
    isFollowing: {
    url,
    xf: body => body.value,
    subscribe
    },
    follow: () => ({
      followResponse: {
        url,
        method: 'PUT',
        invalidates
      }
    }),
    unfollow: () => ({
      unfollowResponse: {
        url,
        method: 'DELETE',
        invalidates
      }
    })
  }
})({
  render
})
