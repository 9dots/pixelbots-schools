/**
 * Imports
 */

import {stopPropagation, component, element} from 'vdux'
import DeleteButton from 'components/DeleteButton'
import AssignButton from 'components/AssignButton'
import LikeButton from 'components/LikeButton'
import EditButton from 'components/EditButton'
import PinButton from 'components/PinButton'
import {Block} from 'vdux-ui'

/**
 * <ActivityCardActions/>
 */

export default component({
  render ({props}) {
    const {
      activity, user, assign, edit, like, pin, archive,
      spread, liked, localLike, ...rest
    } = props

    if (user.userType === 'student') return <span />

    return (
      <Block p align='center' {...rest}>
        <AssignButton
          onClick={stopPropagation}
          activity={activity}
          hide={!assign}
          text={assign}
          user={user} />
        <Block hide={!spread || !activity.published} flex />
        <EditButton
          onClick={stopPropagation}
          activity={activity}
          hide={!edit}
          text={edit} />
        <LikeButton
          onClick={stopPropagation}
          localLike={localLike}
          activity={activity}
          liked={liked}
          hide={!like}
          text={like}
          user={user} />
        <PinButton
          onClick={stopPropagation}
          activity={activity}
          user={user}
          hide={!pin}
          text={pin}
          mr='0' />
        <DeleteButton
          onClick={stopPropagation}
          activity={activity}
          hide={!archive}
          text={archive}
          mr='0' />
      </Block>
    )
  }
})
