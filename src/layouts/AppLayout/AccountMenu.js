/**
 * Imports
 */

import {Dropdown, MenuItem, Divider, Icon, Flex, Text, Block} from 'vdux-containers'
import WeoIcon from 'components/WeoIcon'
import {component, element} from 'vdux'
import Avatar from 'components/Avatar'
import Link from 'components/Link'

/**
 * <AccountMenu/>
 */

export default component({
  render ({props, context}) {
    const {currentUser} = props
    const {username, userType} = currentUser
    const itemProps = {
      ui: MenuItem,
      currentProps: {highlight: true},
      align: 'start center'
    }
    const isStudent = userType === 'student'

    return (
      <Dropdown w='180px' mr='s' btn={<DropdownToggle {...props} />}>
        <Link {...itemProps} href={`/${username}/boards/all`}>
          <Icon name='person' fs='s' mr='s' />
          My Profile
        </Link>
        <Link {...itemProps} href={`/${username}/boards/drafts`} hide={isStudent}>
          <WeoIcon name='draft' fs='s' mr='s' />
          My Drafts
          <Text color='grey_medium' ml='s'>{currentUser.drafts.canonicalTotal.items}</Text>
        </Link>
        <Divider />
        <Link {...itemProps} href='/connect' hide={isStudent}>
          <Icon name='people' fs='s' mr='s' />
          Connect
        </Link>
        <Link {...itemProps} href='/notifications' hide={isStudent}>
          <Icon name='notifications' fs='s' mr='s' />
          Notifications
        </Link>
        <Divider hide={isStudent} />
        <Link {...itemProps} href='/account/settings'>
          <Icon name='settings' fs='s' mr='s' />
          Settings
        </Link>
        <Block {...itemProps} tag='a' href='http://about.weo.io/help' target='_blank' hide={isStudent}>
          <Icon name='help' fs='s' mr='s' />
          Help Center
          <Icon name='open_in_new' fs='11' ml='s' />
        </Block>
        <MenuItem onClick={context.logoutUser} align='start center'>
          <Icon name='exit_to_app' fs='s' mr='s' />
          Log Out
        </MenuItem>
      </Dropdown>
    )
  }
})

/**
 * <DropdownToggle/>
 */

function DropdownToggle ({props}) {
  const {currentUser, ...rest} = props
  const {userType, displayName} = currentUser

  return (
    <Flex {...rest} align='center'>
      <Avatar actor={currentUser} />
      <Flex align='start center' mx hide={userType === 'teacher'}>
        <Block maxWidth={125} ellipsis>
          {displayName}
        </Block>
      </Flex>
    </Flex>
  )
}
