/**
 * Imports
 */

import {Dropdown, MenuItem, Divider, Icon, Flex, Text} from 'vdux-containers'
import {setUrl} from 'redux-effects-location'
import WeoIcon from 'components/WeoIcon'
import {logoutUser} from 'reducer/auth'
import Avatar from 'components/Avatar'
import element from 'vdux/element'

/**
 * Main nav
 */

function render ({props}) {
  const {currentUser} = props

  return (
    <Dropdown w='180px' btn={<Flex align='center'><Avatar actor={currentUser} /></Flex>}>
      <MenuItem align='start center' onClick={() => setUrl(`/${currentUser.username}/boards`)}>
        <Icon name='person' fs='s' mr='s'/>
        My Profile
      </MenuItem>
      <MenuItem align='start center' onClick={() => setUrl('/activities/drafts')}>
        <WeoIcon name='draft' fs='s' mr='s'/>
          My Drafts
          <Text color='midgray' ml='s'>{currentUser.drafts.canonicalTotal.items}</Text>
        </MenuItem>
      <Divider/>
      <MenuItem align='start center'>
        <Icon name='people' fs='s' mr='s'/>
        Connect
      </MenuItem>
      <MenuItem align='start center'>
        <Icon name='notifications' fs='s' mr='s'/>
        Notifications
      </MenuItem>
      <Divider/>
      <MenuItem align='start center'>
        <Icon name='settings' fs='s' mr='s'/>
        Settings
      </MenuItem>
      <MenuItem align='start center'>
        <Icon name='help' fs='s' mr='s'/>
        Help Center
      </MenuItem>
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
