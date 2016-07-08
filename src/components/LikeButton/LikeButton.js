/**
 * Imports
 */

import OutlineButton from 'components/OutlineButton'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <LikeButton/>
 */

function render ({props}) {
  const {
    localLike, liked, activity, likeActivity,
    unlikeActivity, user, onClick = [], text, ...rest
  } = props
  const {likers = []} = activity
  const hasLiked = liked === -1
    ? false
    : liked === 1 || likers.some(liker => liker.id === user._id)

  const click = user
    ? [hasLiked ? unlikeActivity : likeActivity,  () => localLike(hasLiked ? -1 : 1)]
    : () => openModal(() => <SignUpModal />)

  return (
    <OutlineButton
      onClick={[].concat(onClick, click)}
      bgColor={hasLiked && 'red'}
      color='grey_medium'
      icon='favorite'
      {...rest}>
      { text }
    </OutlineButton>
  )
}

/**
 * Exports
 */

export default summon(({activity: {_id}}) => ({
  likeActivity: () => ({
    likeActivity: {
      url: `/share/${_id}/like`,
      method: 'PUT'
    }
  }),
  unlikeActivity: () => ({
    unlikeActivity: {
      url: `/share/${_id}/unlike`,
      method: 'PUT'
    }
  })
}))({
  render
})
