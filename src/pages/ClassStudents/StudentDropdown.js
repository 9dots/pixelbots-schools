/**
 * Imports
 */

import {Button, Dropdown, MenuItem} from 'vdux-containers'
import UsernameModal from 'modals/UsernameModal'
import RemoveFromClassModal from 'modals/RemoveFromClassModal'
import NameModal from 'modals/NameModal'
import PasswordModal from 'modals/PasswordModal'
import IdModal from 'modals/IdModal'
import {openModal} from 'reducer/modal'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'
/**
 * StudentDropdown
 */

function render({props}) {
  const {student, group, showSettings, ...rest} = props

  return (
    <Dropdown z='2' {...rest} btn={({toggle}, open) => <DropButton showSettings={showSettings} open={open} toggle={toggle} />} whiteSpace='nowrap' minWidth='180px'>
      <StudentItem icon='edit' modal={<UsernameModal group={group} user={student}/>}>
        Change Username
      </StudentItem>
      <StudentItem icon='info' modal={<NameModal group={group} user={student}/>}>
        Change Name
      </StudentItem>
      <StudentItem icon='person' modal={<IdModal group={group} user={student}/>}>
        Change ID
      </StudentItem>
      <StudentItem icon='lock' modal={<PasswordModal group={group} user={student}/>}>
        Reset Password
      </StudentItem>
      <StudentItem icon='cancel' modal={<RemoveFromClassModal group={group} user={student}/>}>
        Remove From Class
      </StudentItem>
    </Dropdown>
  )
}

function StudentItem({props, children}) {
  const {modal: Modal, icon} = props
  return (
    <MenuItem onClick={() => openModal(() => Modal)} align='start center'>
      <Icon name={icon} mr fs='s' />
      {children}
    </MenuItem>
  )
}

function DropButton({props}) {
  const {toggle, showSettings, open} = props
  return (
    <Button
      hidden={!(showSettings || open)}
      onClick={toggle}
      hoverProps={{bgColor: 'rgba(black, .1)'}}
      activeProps={{bgColor: 'rgba(black, .15)'}}
      bgColor={open ? 'rgba(black, .15)' : 'transparent'}
      icon='settings'
      color='text'
      circle='26'
      fs='xs'
      />
  )
}

/**
 * Exports
 */

export default {
  render
}