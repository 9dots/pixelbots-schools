/**
 * Imports
 */

import {Dropdown, MenuItem, Divider, Icon, Flex, Text} from 'vdux-containers'
import {setUrl} from 'redux-effects-location'
import WeoIcon from 'components/WeoIcon'
import {logoutUser} from 'reducer/auth'
import Avatar from 'components/Avatar'
import element from 'vdux/element'
import Link from 'components/Link'

/**
 * Main nav
 */

function render ({props}) {
  const {currentUser} = props
  const itemProps = {
    ui: MenuItem,
    currentProps: {highlight: true},
    align: 'start center'
  }

  return (
    <Dropdown w='180px' btn={<Flex align='center'><Avatar actor={currentUser} /></Flex>}>
      <Link {...itemProps} href={`/${currentUser.username}/boards`}>
        <Icon name='person' fs='s' mr='s'/>
        My Profile
      </Link>
      <Link {...itemProps} href='/activities/drafts'>
        <WeoIcon name='draft' fs='s' mr='s'/>
        My Drafts
        <Text color='grey' ml='s'>{currentUser.drafts.canonicalTotal.items}</Text>
      </Link>
      <Divider/>
      <Link {...itemProps} href='/connect/andrew'>
        <Icon name='people' fs='s' mr='s'/>
        Connect
      </Link>
      <Link {...itemProps} href='/notifications'>
        <Icon name='notifications' fs='s' mr='s'/>
        Notifications
      </Link>
      <Divider/>
      <Link {...itemProps} href='/account/settings'>
        <Icon name='settings' fs='s' mr='s'/>
        Settings
      </Link>
      <Link {...itemProps} tag='a' href='http://about.weo.io/help' target='_blank'>
        <Icon name='help' fs='s' mr='s'/>
        Help Center
        <Icon name='open_in_new' fs='11' ml='s'/>
      </Link>
      <MenuItem onClick={logoutUser} align='start center'>
        <Icon name='exit_to_app' fs='s' mr='s'/>
        Log Out
      </MenuItem>
    </Dropdown>
  )
}

/**
 * Exports
 */

export default {
  render
}
