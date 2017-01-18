/**
 * Imports
 */

import RemoveFromClassModal from 'modals/RemoveFromClassModal'
import InviteStudentsModal from 'modals/InviteStudentsModal'
import EmptyClassStudents from './EmptyClassStudents'
import CreateStudentModal from 'modals/CreateStudentModal'
import AddStudentModal from 'modals/AddStudentModal'
import PrintLoginModal from 'modals/PrintLoginModal'
import {Button, form, Tooltip, Dropdown, MenuItem} from 'vdux-containers'
import PasswordModal from 'modals/PasswordModal'
import PageTitle from 'components/PageTitle'
import {Icon, Flex, Block} from 'vdux-ui'
import Loading from 'components/Loading'
import StudentGrid from './StudentGrid'
import {component, element} from 'vdux'
import summon from 'vdux-summon'
import index from '@f/index'

/**
 * <ClassStudents/>
 */

export default summon(({group}) => ({
  students: `/group/students?group=${group._id}`
}))(
  form(({students}) => ({
    fields: ['selected']
  }))(component({
    render ({props}) {
      const {group, students, toggleAll, fields, currentUser} = props
      const {value, loading, loaded} = students

      if (!loaded && loading) return <Loading show h='200' />

      const {items: studentList} = value
      const studentIds = index(({_id}) => _id, studentList)
      const selected = (fields.selected.value || []).filter(id => studentIds[id])

      return (
        <Block maxWidth='714px' my py mx='auto' relative>
          <PageTitle title={`${group.displayName} | Students`} />
          {
            loaded && studentList.length
              ? <Block>
                  <StudentMenu students={studentList} group={group} selected={selected} currentUser={currentUser} />
                  <StudentGrid students={studentList} group={group} selected={selected} toggleAll={toggleAll} currentUser={currentUser} />
                </Block>
                : <EmptyClassStudents group={group} />
          }
        </Block>
      )
    }
  })
))

/**
 * <StudentMenu/>
 */

const highlightProps = {highlight: 0.02}
const btnProps = {
  color: 'white',
  h: '30',
  fs: 'xxs',
  px: 'm',
  mr: 's'
}

const StudentMenu = component({
  render ({props, actions}) {
    const {students, selected, currentUser} = props
    const isStudent = currentUser.userType === 'student'
    const {length: count} = selected
    const users = students.filter(({_id}) => selected.indexOf(_id) !== -1)

    if (isStudent) return <span />

    return (
      <Flex align='space-between center' mb>
        <Dropdown wide mr='s' btn={<Button {...btnProps}>
          <Icon name='people' mr='s' fs='s'/>
          Add Students 
          <Icon name='arrow_drop_down' ml='s' fs='s'/>
        </Button>}>
          <MenuItem align='start center' fs='xxs' onClick={actions.addStudentModal}>
            <Icon name='add' bold mr fs='s' />Add From School
          </MenuItem>
          <MenuItem align='start center' fs='xxs' onClick={actions.inviteStudentModal}>
            <Icon name='email' mr fs='s' />Email Invitation
          </MenuItem>
          <MenuItem align='start center' fs='xxs' onClick={actions.createStudentModal}>
            <Icon name='edit' mr fs='s' />Create New
          </MenuItem>
        </Dropdown>
        <Tooltip message={!count && 'Select Students to Enable'}>
          <Button disabled={!count} bgColor='white' {...btnProps} hoverProps={highlightProps} focusProps={highlightProps} color='text' onClick={actions.passwordModal(users)}>
            <Icon name='lock' mr='s' fs='s' />Reset Password
          </Button>
        </Tooltip>
        <Tooltip message={!count && 'Select Students to Enable'}>
          <Button disabled={!count} bgColor='white' {...btnProps} hoverProps={highlightProps} focusProps={highlightProps} color='text' onClick={actions.printLoginModal(users)}>
            <Icon name='print' mr='s' fs='s' />Print Login Info
          </Button>
        </Tooltip>
        <Tooltip message={!count && 'Select Students to Enable'}>
          <Button disabled={!count} bgColor='red' color='white' {...btnProps} onClick={actions.removeModal(users)}>
            <Icon name='delete' mr='s' fs='s' />Remove
          </Button>
        </Tooltip>
        <Flex flex align='end center'>
          <Block color='blue' align='center center' hide={!count}>
            {count} selected
          </Block>
        </Flex>
      </Flex>
    )
  },

  controller: {
    * addStudentModal ({props, context}) {
      yield context.openModal(() => <AddStudentModal groupId={props.group._id} />)
    },

    * createStudentModal ({props, context}) {
      yield context.openModal(() => <CreateStudentModal groupId={props.group._id} />)
    },

    * inviteStudentModal ({props, context}) {
      yield context.openModal(() => <InviteStudentsModal group={props.group} />)
    },

    * removeModal ({props, context}, users) {
      yield context.openModal(() => <RemoveFromClassModal user={users} group={props.group} />)
    },

    * printLoginModal ({props, context}, users) {
      yield context.openModal(() => <PrintLoginModal user={users} />)
    },

    * passwordModal ({props, context}, users) {
      yield context.openModal(() => <PasswordModal user={users} group={props.group} />)
    }
  }
})
