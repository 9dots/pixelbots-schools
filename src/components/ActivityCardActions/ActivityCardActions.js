/**
 * Imports
 */

import {setUrl} from 'redux-effects-location'
import {Button, Icon} from 'vdux-containers'
import AssignModal from 'modals/AssignModal'
import SignUpModal from 'modals/SignUpModal'
import WeoIcon from 'components/WeoIcon'
import {openModal} from 'reducer/modal'
import PinModal from 'modals/PinModal'
import Confirm from 'modals/Confirm'
import {Block, Text} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * getProps
 */

function getProps (props, {currentUrl}) {
  props.isCurrentActivity = currentUrl.indexOf(props.activity._id) !== -1
  return props
}


/**
 * <ActivityCardActions/>
 */

function render ({props}) {
  const {
    activity, user, assign, edit, like, pin, likeActivity,
    unlikeActivity, actions = [], spread = true, isCurrentActivity,
    liked, localLike,
    ...rest
  } = props
  const {published, channels, actor, likers = []} = activity
  const isOwner = actor.id === user._id
  const hasLiked = liked || likers.some(function(liker) {
    return liker.id === user._id
  })

  if(!actions.length) return <span />

  return (
    <Block p align='center' {...rest}>
      <Action
        onClick={
          () => openModal(() =>
            user
              ? <AssignModal activity={activity} />
              : <SignUpModal />)
        }
        hide={isHidden('assign')}
        text='Assign'
        color='green'
        full={assign}
        icon='send'/>
      <Block hide={!spread || !published} flex/>
      <Action
        onClick={() => setUrl(`/activity/${activity._id}/edit`)}
        color='grey_medium'
        hide={isHidden('edit')}
        icon='edit'
        text='Edit'
        full={edit}/>
      <Action
        onClick={
          user
            ? [hasLiked ? unlikeActivity : likeActivity,  localLike]
            : () => openModal(() => <SignUpModal />)
        }
        icon='favorite'
        hide={isHidden('like')}
        bgColor={hasLiked && 'red'}
        color='grey_medium'
        text='Like'
        full={like}/>
      <Action
        onClick={
          () => openModal(() =>
            user
              ? <PinModal activity={activity} />
              : <SignUpModal />)
        }
        activity={activity}
        hide={isHidden('pin')}
        weoIcon='pin'
        color='blue'
        text='Pin'
        full={pin}
        mr='0'/>
      <Action
        onClick={deleteActivity}
        hide={isHidden('delete')}
        icon='delete'
        text='Delete'
        color='grey_medium'
        mr='0'
        />
    </Block>
  )

  function deleteActivity () {
    return openModal(() =>
      <DeleteActivity
        activityId={activity._id}
        redirect={isCurrentActivity && '/feed'}
        message={<Block>Are you sure you want to delete <Text bold color='blue'> {activity.displayName}</Text>?</Block>} />
      )
  }

  function isHidden(action) {
    return actions.indexOf(action) === -1
  }
}

/**
 * ActionButton
 */

function Action ({props}) {
  const {
    icon, weoIcon, text, full, color = 'text',
    bgColor, onClick, ...rest
  } = props

  return (
    <Button
      onClick={[e => e.stopPropagation(), onClick]}
      hoverProps={{highlight: 0.02}}
      focusProps={{highlight: 0.02}}
      border={'1px solid ' + (bgColor ? 'rgba(0,0,0, .2)' : color)}
      bgColor={bgColor || 'white'}
      color={bgColor ? 'white' : color}
      mr='s'
      h='32px'
      px='8px'
      {...rest}>
        {icon && <Icon name={icon} fs='s' />}
        {weoIcon && <WeoIcon name={weoIcon} fs='s' />}
        <Block hide={!full} ml='s'>
          {text}
        </Block>
    </Button>
  )
}

const DeleteActivity = summon(({activityId}) => ({
  onAccept: () => ({
    deleting: {
      url: `/share/${activityId}`,
      method: 'DELETE',
      invalidates: ['activity_feed']
    }
  })
}))(Confirm)

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
  getProps,
  render
})
