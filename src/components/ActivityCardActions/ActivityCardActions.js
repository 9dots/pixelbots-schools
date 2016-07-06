/**
 * Imports
 */

import DeleteActivityModal from 'modals/DeleteActivityModal'
import {setUrl} from 'redux-effects-location'
import {Button, Icon} from 'vdux-containers'
import AssignModal from 'modals/AssignModal'
import SignUpModal from 'modals/SignUpModal'
import WeoIcon from 'components/WeoIcon'
import {openModal} from 'reducer/modal'
import PinModal from 'modals/PinModal'
import {Block, Text} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'


/**
 * <ActivityCardActions/>
 */

function render ({props}) {
  const {
    activity, user, assign, edit, like, pin, archive, likeActivity,
    unlikeActivity, spread = true, isCurrentActivity,
    liked, localLike,
    ...rest
  } = props
  const {published, channels, actor, likers = []} = activity
  const isOwner = actor.id === user._id
  const hasLiked = liked || likers.some(function(liker) {
    return liker.id === user._id
  })

  if(user.userType === 'student') return <span />

  return (
    <Block p align='center' {...rest}>
      <Action
        onClick={
          () => openModal(() =>
            user
              ? <AssignModal activity={activity} />
              : <SignUpModal />)
        }
        text={assign}
        color='green'
        icon='send'/>
      <Block hide={!spread || !published} flex/>
      <Action
        onClick={() => setUrl(`/activity/${activity._id}/edit`)}
        color='grey_medium'
        text={edit}
        icon='edit'/>
      <Action
        onClick={
          user
            ? [hasLiked ? unlikeActivity : likeActivity,  localLike]
            : () => openModal(() => <SignUpModal />)
        }
        icon='favorite'
        bgColor={hasLiked && 'red'}
        color='grey_medium'
        text={like}/>
      <Action
        onClick={
          () => openModal(() =>
            user
              ? <PinModal activity={activity} />
              : <SignUpModal />)
        }
        activity={activity}
        weoIcon='pin'
        color='blue'
        text={pin}
        mr='0'/>
      <Action
        onClick={() => openModal(() => <DeleteActivityModal activity={activity} />)}
        icon='delete'
        text={archive}
        color='grey_medium'
        mr='0'
        />
    </Block>
  )
}

/**
 * ActionButton
 */

function Action ({props}) {
  const {
    icon, weoIcon, text, full, color = 'text',
    bgColor, onClick, ...rest
  } = props
  const isString = typeof text === 'string'

  return (
    <Button
      onClick={[e => e.stopPropagation(), onClick]}
      hoverProps={{highlight: 0.02}}
      focusProps={{highlight: 0.02}}
      border={'1px solid ' + (bgColor ? 'rgba(0,0,0, .2)' : color)}
      bgColor={bgColor || 'white'}
      color={bgColor ? 'white' : color}
      hide={!text}
      mr='s'
      h='32px'
      px='8px'
      {...rest}>
        {icon && <Icon name={icon} fs='s' />}
        {weoIcon && <WeoIcon name={weoIcon} fs='s' />}
        <Block hide={!isString} ml='s'>
          {text}
        </Block>
    </Button>
  )
}

/**
 * Exports
 */

export default summon(({activity}) => {
  const {_id} = activity
  const invalidates = ['/share/' + _id, 'activity_feed']

  return {
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
  }
})({
  render
})
