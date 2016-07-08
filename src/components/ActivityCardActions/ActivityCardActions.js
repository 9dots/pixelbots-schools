/**
 * Imports
 */

import DeleteButton from 'components/DeleteButton'
import AssignButton from 'components/AssignButton'
import LikeButton from 'components/LikeButton'
import EditButton from 'components/EditButton'
import PinButton from 'components/PinButton'
import element from 'vdux/element'
import {Block} from 'vdux-ui'


/**
 * <ActivityCardActions/>
 */

function render ({props}) {
  const {
    activity, user, assign, edit, like, pin, archive,
    spread, liked, localLike, ...rest
  } = props
  const {published, channels, actor, likers = []} = activity
  const isOwner = actor.id === user._id

  if(user.userType === 'student') return <span />

  return (
    <Block p align='center' {...rest}>
      <AssignButton
        onClick={e => e.stopPropagation()}
        activity={activity}
        hide={!assign}
        text={assign}
        user={user}/>
      <Block hide={!spread || !activity.published} flex/>
      <EditButton
        onClick={e => e.stopPropagation()}
        activity={activity}
        hide={!edit}
        text={edit}/>
      <LikeButton
        onClick={e => e.stopPropagation()}
        localLike={localLike}
        activity={activity}
        liked={liked}
        hide={!like}
        text={like}
        user={user}/>
      <PinButton
        onClick={e => e.stopPropagation()}
        activity={activity}
        user={user}
        hide={!pin}
        text={pin}
        mr='0'/>
      <DeleteButton
        onClick={e => e.stopPropagation()}
        activity={activity}
        hide={!archive}
        text={archive}
        mr='0'/>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
