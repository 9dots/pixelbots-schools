/**
 * Imports
 */

import RemoveFromClassModal from 'modals/RemoveFromClassModal'
import InviteStudentsModal from 'modals/InviteStudentsModal'
import CreateStudentModal from 'modals/CreateStudentModal'
import EmptyClassStudents from './EmptyClassStudents'
import {Button, form, Tooltip} from 'vdux-containers'
import AddStudentModal from 'modals/AddStudentModal'
import PrintLoginModal from 'modals/PrintLoginModal'
import PasswordModal from 'modals/PasswordModal'
import ResetAllPasswordsModal from 'modals/ResetAllPasswordsModal'
import PageTitle from 'components/PageTitle'
import {Icon, Flex, Block} from 'vdux-ui'
import Loading from 'components/Loading'
import StudentGrid from './StudentGrid'
import {component, element} from 'vdux'
import mapValues from '@f/map-values'
import index from '@f/index'
import fire from 'vdux-fire'
import map from '@f/map'

/**
 * <ClassStudents/>
 */

export default fire(({group, groupId}) => ({
  students: {
    ref: `/classes/${groupId}`,
    join: {
      ref: '/users',
      child: 'students',
      childRef: (val, ref) => map((v, key) => ref.child(key), val.students || {})
    }
  },
  passwordSetting: `/classes/${groupId}/hasPicturePassword`
}))(form(({students}) => ({
  fields: ['selected']
}))(component({
    render ({props}) {
      const {toggleAll, fields, group, currentUser, students, groupId, passwordSetting} = props
      if (students.loading) return <span/>

      const studentList = mapValues((s, id) => ({...s, id}), students.value.students)
      const selected = (fields.selected.value || []).filter(id => students.value.students[id])
      const showPasswords = passwordSetting.value
      return (
        <Block maxWidth='714px' my py mx='auto' relative>
          <PageTitle title={`${group.displayName} | Students`} />
          {
            studentList.length
              ? <Block>
                  <StudentMenu showPasswords={showPasswords} students={studentList} group={group} selected={selected} currentUser={currentUser} groupId={groupId}/>
                  <StudentGrid showPasswords={showPasswords} students={studentList} group={group} selected={selected} toggleAll={toggleAll} currentUser={currentUser} groupId={groupId} />
                </Block>
              : <EmptyClassStudents group={group} groupId={groupId} />
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
    const {students, selected, currentUser, showPasswords} = props
    const isStudent = currentUser.userType === 'student'
    const {length: count} = selected
    const users = students.filter(({id}) => selected.indexOf(id) !== -1)

    if (isStudent) return <span />

    return (
      <Flex align='space-between center' mb>
        <Button {...btnProps} onClick={actions.addStudentModal}>
          <Icon name='group_add' mr='s' fs='s'/>
          Add Students
        </Button>
        <Tooltip message={!count && 'Select Students to Enable'}>
          <Button disabled={!count} bgColor='red' color='white' {...btnProps} onClick={actions.removeModal(users)}>
            <Icon name='delete' mr='s' fs='s' />Remove
          </Button>
        </Tooltip>
        {showPasswords ?
        <Button {...btnProps} bgColor='green' onClick={actions.resetPasswordsModal}>
          <Icon name='lock' mr='s' fs='s'/>
          Reset All Passwords
        </Button> : null }
        {showPasswords ?
        <Tooltip message={!count && 'Select Students to Enable'}>
          <Button disabled={!count} onClick={actions.printLoginModal(users)} bgColor='grey'> 
          <Icon name='print' mr='s' fs='s' /> Print Student Cards
          </Button> 
        </Tooltip> : null }
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
      yield context.openModal(() => <CreateStudentModal groupId={props.groupId}  />)
    },

    * resetPasswordsModal ({props, context}) {
      yield context.openModal(() => <ResetAllPasswordsModal users={props.students} />)
    },  

    * removeModal ({props, context}, users) {
      yield context.openModal(() => <RemoveFromClassModal user={users} groupId={props.groupId} />)
    },

    * printLoginModal ({props, context}, users) {
      yield context.openModal(() => <PrintLoginModal users={users} />)
    },

    * passwordModal ({props, context}, users) {
      yield context.openModal(() => <PasswordModal user={users} group={props.group} />)
    }
  }
})
