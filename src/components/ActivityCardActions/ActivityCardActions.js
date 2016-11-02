/**
 * Imports
 */

import DeleteButton from 'components/DeleteButton'
import AssignButton from 'components/AssignButton'
import LikeButton from 'components/LikeButton'
import EditButton from 'components/EditButton'
import PinButton from 'components/PinButton'
import {component, element} from 'vdux'
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
    const {published, actor} = activity

    if (user.userType === 'student') return <span />

    return (
      <Block p align='center' {...rest}>
        <AssignButton
          onClick={{stopPropagation: true}}
          activity={activity}
          hide={!assign}
          text={assign}
          user={user} />
        <Block hide={!spread || !published} flex />
        <EditButton
          onClick={{stopPropagation: true}}
          activity={activity}
          hide={!edit}
          text={edit} />
        <LikeButton
          onClick={{stopPropagation: true}}
          localLike={localLike}
          activity={activity}
          liked={liked}
          hide={!like}
          text={like}
          user={user} />
        <PinButton
          onClick={{stopPropagation: true}}
          activity={activity}
          user={user}
          hide={!pin}
          text={pin}
          mr='0' />
        <DeleteButton
          onClick={{stopPropagation: true}}
          activity={activity}
          hide={!archive}
          text={archive}
          mr='0' />
      </Block>
    )
  }
})
