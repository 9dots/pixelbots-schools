/**
 * Imports
 */

import {Dropdown, MenuItem, Divider, Icon, Flex} from 'vdux-containers'
import {logoutUser} from 'reducer/currentUser'
import WeoIcon from 'components/WeoIcon'
import Avatar from 'components/Avatar'
import element from 'vdux/element'

/**
 * Main nav
 */

function render ({props}) {
  const {currentUser} = props

  return (
    <Dropdown w='180px' btn={<Flex align='center'><Avatar actor={currentUser} /></Flex>}>
      <MenuItem display='flex' align='start center'>
        <Icon name='person' fs='s' mr='s'/>
        My Profile
      </MenuItem>
      <MenuItem display='flex' align='start center'>
        <WeoIcon name='draft' fs='s' mr='s'/>
          My Drafts
        </MenuItem>
      <Divider/>
      <MenuItem display='flex' align='start center'>
        <Icon name='people' fs='s' mr='s'/>
        Connect
      </MenuItem>
      <MenuItem display='flex' align='start center'>
        <Icon name='notifications' fs='s' mr='s'/>
        Notifications
      </MenuItem>
      <Divider/>
      <MenuItem display='flex' align='start center'>
        <Icon name='settings' fs='s' mr='s'/>
        Settings
      </MenuItem>
      <MenuItem display='flex' align='start center'>
        <Icon name='help' fs='s' mr='s'/>
        Help Center
      </MenuItem>
      <MenuItem onClick={logoutUser} display='flex' align='start center'>
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
