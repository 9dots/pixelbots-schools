/**
 * Imports
 */

import {Block, Menu, MenuItem, Icon, Card, Flex, Text} from 'vdux-ui'
import {Button, Tooltip, wrap, CSSContainer} from 'vdux-containers'
import AvatarPickerModal from 'modals/AvatarPickerModal'
import ColorPickerModal from 'modals/ColorPickerModal'
import FollowButton from 'components/FollowButton'
import {setUrl} from 'redux-effects-location'
import NavTile from 'components/NavTile'
import {openModal} from 'reducer/modal'
import Avatar from 'components/Avatar'
import * as colors from 'lib/colors'
import Link from 'components/Link'
import element from 'vdux/element'
import Color from 'Color'

/**
 * Profile Layout Header
 */

function render ({props}) {
  const {user, isCurrentUser} = props
  const {
    displayName, username, website = '',
    aboutMe, gradeLevels = [], subjects = [],
    location, following, followers
  } = user
  const displayUrl = website && website.replace(/.*?:\/\//g, "")

  return (
    <Card wide relative mb>
      <Flex p>
        <AvatarPicker user={user}
          onClick={() => openAvatarModal(isCurrentUser, user)}
          hoverProps={{hover: isCurrentUser}}
          activeProps={{active: isCurrentUser}}
          pointer={isCurrentUser} />
        <Flex column flex='60%'>
          <Flex p={4} ml={-4} fw='lighter' fs='m' align='start center'>
            <Text capitalize>{displayName}</Text>
            <Text px='s'>&middot;</Text>
            <Text fs='s' color='blue'>{username}</Text>
          </Flex>
          <Flex p={4} color='grey_medium' fs='xs' align='start center'>
            <ProfileItem message={displayUrl} icon='language' tag='a' href={website} pointer />
            <ProfileItem message={location} icon='place' />
            <ProfileItem message={gradeLevels.join(', ')} icon='school' />
            <ProfileItem message={subjects.join(', ')} icon='class' />
          </Flex>
          <Block color='text' mt='m'>
            {aboutMe}
          </Block>
        </Flex>
        <Flex hide={!isCurrentUser} absolute='top 12px right 12px'>
          <Button
            onClick={() => openModal(() => <ColorPickerModal user={user} />)}
            hoverProps={{text: <Icon fs='s' name='colorize' />}}
            align='center center'
            bgColor={user.color}
            circle='30'
            tag='div'/>
          <Button uppercase ml='m' color='grey_medium' border='grey_medium' borderWidth='1px' bgColor='white' hoverProps={{highlight: 0.01}} focusProps={{highlight: 0.01}} onClick={() => setUrl('/account/profile')}>
            Edit Profile
          </Button>
        </Flex>
        <Flex hide={isCurrentUser} absolute='top 12px right 12px'>
          <FollowButton user={user} />
        </Flex>
      </Flex>
      <Flex fs='xxs' align='center center' h='46px' bgColor='off_white' uppercase>
        <NavTile href={`/${username}/boards`} highlight='red'>Boards</NavTile>
        <NavTile href={`/${username}/likes`} highlight='green'>Likes</NavTile>
        <NavTile href={`/${username}/following`} highlight='blue'>
          <Text mr={3} weight='bolder' fs='xs'>{following}</Text>
          Following
        </NavTile>
        <NavTile href={`/${username}/followers`} highlight='yellow'>
          <Text mr={3} weight='bolder' fs='xs'>{followers}</Text>
          Followers
        </NavTile>
        <NavTile href={`/${username}/stream`} highlight='grey_medium'>Stream</NavTile>
      </Flex>
    </Card>
  )
}

function openAvatarModal(isCurrentUser, user) {
  if(isCurrentUser)
    return openModal(() => <AvatarPickerModal user={user}/>)
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
        <Block pb='100%'>
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
 * Profile description item
 */

function ProfileItem ({props}) {
  const {icon, message, ...rest} = props

  return (
    <Tooltip mr align='start center' maxWidth='25%' message={message} hide={!message} tooltipProps={{whiteSpace: 'normal'}} placement='bottom' {...rest}>
      <Icon fs='inherit' name={icon} mr='s' />
      <Text ellipsis>{message}</Text>
    </Tooltip>
  )
}


/**
 * Exports
 */

export default {
  render
}
