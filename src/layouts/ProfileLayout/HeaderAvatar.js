/**
 * Imports
 */

import AvatarPickerModal from 'modals/AvatarPickerModal'
import {wrap, CSSContainer} from 'vdux-containers'
import {openModal} from 'reducer/modal'
import Avatar from 'components/Avatar'
import * as colors from 'lib/colors'
import {Block, Flex} from 'vdux-ui'
import element from 'vdux/element'
import Color from 'Color'

/**
 * HeaderAvatar
 */

function render({props}) {
  const {user, isMe} = props

  return (
    <AvatarPicker user={user}
      onClick={openAvatarModal(isMe, user)}
      hoverProps={{hover: isMe}}
      activeProps={{active: isMe}}
      pointer={isMe}/>
  )
}

function openAvatarModal(isCurrentUser, user) {
  if(isCurrentUser)
    return () => openModal(() => <AvatarPickerModal user={user}/>)
}

/**
 * Avatar modal open
 */

const AvatarPicker = wrap(CSSContainer)({
  render({props}) {
    const {blue} = colors
    const {user, hover, active, ...rest} = props
    const overlayBg = Color(blue).alpha(0.3).rgbaString()
    const overlayActive = Color(blue).alpha(0.4).rgbaString()
    const shadow = Color(blue).alpha(0.5).rgbaString()

    return (
      <Block w='18%' mr='m' relative {...rest}>
        <Block pb='100%' bgColor='grey_light' borderRadius='50%'>
          <Avatar actor={user} w='100%' h='auto' alignSelf='center' absolute />
          <Flex
            bg={active ? overlayActive : overlayBg}
            boxShadow={'0 0 1px 1px ' + shadow}
            transition='opacity .35s'
            opacity={hover ? 1 : 0}
            align='center center'
            circle='100%'
            color='white'
            absolute >
            Change Avatar
          </Flex>
        </Block>
      </Block>
    )
  }
})

/**
 * Exports
 */

export default {
  render
}
