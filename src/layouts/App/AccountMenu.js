/**
 * Imports
 */

import {Dropdown, MenuItem, Divider, Icon} from 'vdux-containers'
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
    <Dropdown w='180px' btn={<Avatar actor={currentUser} />}>
      <MenuItem>
        <Icon name='person' />
        My Profile
      </MenuItem>
      <MenuItem>
        <WeoIcon name='draft' />
          My Drafts
        </MenuItem>
      <Divider/>
      <MenuItem>
        <Icon name='people' />
        Connect
      </MenuItem>
      <MenuItem>
        <Icon name='notifications' />
        Notifications
      </MenuItem>
      <Divider/>
      <MenuItem>
        <Icon name='settings' />
        Settings
      </MenuItem>
      <MenuItem>
        <Icon name='help' />
        Help Center
      </MenuItem>
      <MenuItem onClick={logoutUser}>
        <Icon name='exit_to_app' />
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
