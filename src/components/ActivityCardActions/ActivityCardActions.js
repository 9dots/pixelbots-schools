/**
 * Imports
 */

import {setUrl} from 'redux-effects-location'
import {Button, Icon} from 'vdux-containers'
import AssignModal from 'modals/AssignModal'
import WeoIcon from 'components/WeoIcon'
import {openModal} from 'reducer/modal'
import PinModal from 'modals/PinModal'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

/**
 * <ActivityCardActions/>
 */

function render ({props}) {
  const {
    activity, user, assign, edit, like, pin,
    likeActivity, unlikeActivity, ...rest
  } = props
  const isOwner = activity.actor.id === user._id
  const hasLiked = activity.likers.some(function(liker) {
    return liker.id === user._id
  })

  return (
    <Block p align='center' {...rest}>
      <Action
        onClick={() => openModal(() => <AssignModal activity={activity} />)}
        text='Assign'
        color='green'
        full={assign}
        icon='send'/>
      <Block flex/>
      <Action
        onClick={() => setUrl(`/activity/${activity._id}/edit`)}
        color='grey_medium'
        hide={!isOwner}
        icon='edit'
        text='Edit'
        full={edit}/>
      <Action
        onClick={hasLiked ? unlikeActivity : likeActivity}
        icon='favorite'
        hide={isOwner}
        bgColor={hasLiked && 'red'}
        color='grey_medium'
        text='Like'
        full={like}/>
      <Action
        onClick={() => openModal(() => <PinModal activity={activity} />)}
        activity={activity}
        weoIcon='pin'
        color='blue'
        text='Pin'
        full={pin}/>
    </Block>
  )
}

/**
 * ActionButton
 */

function Action({props}) {
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
        method: 'PUT',
        invalidates
      }
    }),
    unlikeActivity: () => ({
      unlikeActivity: {
        url: `/share/${_id}/unlike`,
        method: 'PUT',
        invalidates
      }
    })
  }
})({
  render
})
