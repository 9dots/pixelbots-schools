/**
 * Imports
 */

import RemoveFromClassModal from 'modals/RemoveFromClassModal'
import {Button, Dropdown, MenuItem} from 'vdux-containers'
import UsernameModal from 'modals/UsernameModal'
import PasswordModal from 'modals/PasswordModal'
import ChangeStudentPasswordModal from 'modals/ChangeStudentPasswordModal'
import NameModal from 'modals/NameModal'
import {component, element} from 'vdux'
import IdModal from 'modals/IdModal'
import {Icon} from 'vdux-ui'

/**
 * StudentDropdown
 */

export default component({
  render ({props, actions}) {
    const {student, group, groupId, showSettings, changePassword, ...rest} = props

    return (
      <Dropdown z='2' {...rest} btn={({toggle}, open) => <DropButton showSettings={showSettings} open={open} toggle={toggle} />} whiteSpace='nowrap' minWidth='180px'>
        <StudentItem icon='info' modal={<NameModal group={group} user={student} />}>
          Change Name
        </StudentItem>
        <StudentItem icon='person' modal={<IdModal group={group} user={student} />}>
          Change ID
        </StudentItem>
        <StudentItem icon='cancel' modal={<RemoveFromClassModal group={group} groupId={groupId} user={student} />}>
          Remove From Class
        </StudentItem>
        <StudentItem icon='cancel' modal={<ChangeStudentPasswordModal group={group} groupId={groupId} user={student} />}>
          Change Password
        </StudentItem>
      </Dropdown>
    )
  }
})

/**
 * <StudentItem/>
 */

const StudentItem = component({
  render ({props, children, actions}) {
    const {icon} = props

    return (
      <MenuItem onClick={actions.openModal} align='start center'>
        <Icon name={icon} mr fs='s' />
        {children}
      </MenuItem>
    )
  },

  controller: {
    * openModal ({context, props}) {
      yield context.openModal(() => props.modal)
    }
  }
})

/**
 * <DropButton/>
 */

function DropButton ({props}) {
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
