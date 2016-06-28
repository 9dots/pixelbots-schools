/**
 * Imports
 */

import {Block, Menu, MenuItem, Icon, Card, Flex} from 'vdux-ui'
import {Button, Tooltip, Text} from 'vdux-containers'
import ColorPickerModal from 'modals/ColorPickerModal'
import DescriptionModal from 'modals/DescriptionModal'
import FollowButton from 'components/FollowButton'
import {setUrl} from 'redux-effects-location'
import HeaderAvatar from './HeaderAvatar'
import {openModal} from 'reducer/modal'
import ProfileNav from './ProfileNav'
import * as colors from 'lib/colors'
import Link from 'components/Link'
import element from 'vdux/element'

/**
 * Profile Layout Header
 */

function render ({props}) {
  const {user, currentUser} = props
  const {
    displayName, username, website = '',
    aboutMe, gradeLevels = [], subjects = [],
    location, userType
  } = user
  const isMe = username === currentUser.username
  const displayUrl = website && website.replace(/.*?:\/\//g, "")
  const showNav = userType === 'teacher' && (!currentUser || currentUser.userType === 'teacher')

  return (
    <Card wide relative mb>
      <Flex p>
        <HeaderAvatar user={user} isMe={isMe} />
        <Flex column flex='60%'>
          <Flex p={4}  fw='lighter' fs='m' align='start center'>
            <Text capitalize>{displayName}</Text>
            <Text px='s'>&middot;</Text>
            <Text fs='s' color='blue'>{username}</Text>
          </Flex>
          <Flex p={4} color='grey_medium' fs='xs' align='start center'>
            <ProfileItem message={displayUrl} icon='language' tag='a' href={website} pointer target='_blank' />
            <ProfileItem message={location} icon='place' />
            <ProfileItem message={gradeLevels.join(', ')} icon='school' />
            <ProfileItem message={subjects.join(', ')} icon='class' />
          </Flex>
          <Block color='text' ml='4' mt='m'>
            {
              aboutMe
                ? aboutMe
                : <Text pointer hide={!isMe} color='grey_medium' hoverProps={{underline: true}} onClick={() => openModal(() => <DescriptionModal user={currentUser} />)}>
                    Add some information about yourself!
                  </Text>
            }
          </Block>
        </Flex>
        <Flex hide={!isMe} absolute='top 12px right 12px'>
          <Button
            onClick={() => openModal(() => <ColorPickerModal user={user} />)}
            hoverProps={{text: <Icon fs='s' name='colorize' />}}
            align='center center'
            bgColor={user.color || colors.pickerColors[0]}
            circle='30'
            tag='div'/>
          <Button uppercase ml='m' color='grey_medium' border='grey_medium' borderWidth='1px' bgColor='white' hoverProps={{highlight: 0.01}} focusProps={{highlight: 0.01}} onClick={() => setUrl('/account/profile')}>
            Edit Profile
          </Button>
        </Flex>
        <Flex hide={isMe} absolute='top 12px right 12px'>
          { currentUser.userType === 'teacher' && <FollowButton user={user} /> }
        </Flex>
      </Flex>
      {
        showNav && <ProfileNav user={user} />
      }
    </Card>
  )
}

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
