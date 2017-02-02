/**
 * Imports
 */

import {Button, Dropdown, MenuItem} from 'vdux-containers'
import {component, element, preventDefault} from 'vdux'
import UsernameModal from 'modals/UsernameModal'
import PasswordModal from 'modals/PasswordModal'
import NameModal from 'modals/NameModal'
import IdModal from 'modals/IdModal'
import {Icon} from 'vdux-ui'

/**
 * StudentDropdown
 */

export default component({
  render ({props}) {
    const {student, group, showSettings, ...rest} = props

    return (
      <Dropdown z='2' {...rest} btn={({toggle}, open) => <DropButton showSettings={showSettings} open={open} toggle={toggle} />} whiteSpace='nowrap' minWidth='180px' onClick={preventDefault}>
        <StudentItem icon='info' modal={<NameModal user={student} />}>
          Change Name
        </StudentItem>
        <StudentItem icon='edit' modal={<UsernameModal user={student} />}>
          Change Username
        </StudentItem>
        <StudentItem icon='person' modal={<IdModal user={student} />}>
          Change ID
        </StudentItem>
        <StudentItem icon='lock' modal={<PasswordModal user={student} />}>
          Reset Password
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
