/**
 * Imports
 */

import InviteStudentsModal from 'modals/InviteStudentsModal'
import CreateStudentModal from 'modals/CreateStudentModal'
import AddStudentModal from 'modals/AddStudentModal'
import {Button, Tooltip} from 'vdux-containers'
import {Icon, Block, Text} from 'vdux-ui'
import {component, element} from 'vdux'

/**
 * <EmptyClassStudents/>
 */

export default component({
  render ({props, actions}) {
    const {group} = props
    const btnProps = {py: '10px', boxShadow: 'z2'}
    return (
      <Block p textAlign='center'>
        <Icon name='people' fs='xxl' color='green' />
        <Block my fs='m' lighter>
          Your class has no students
        </Block>
        <Block align='center center' my='l'>
          <Button {...btnProps} onClick={actions.addStudentModal}>
            <Icon name='person_add' mr fs='s' />
            Add From School
            <Tooltip message='Add students who are already registered in another class at your school.' align='center center' tooltipProps={{whiteSpace: 'normal', w: '200'}}>
              <Icon name='info' ml='s' fs='xs' />
            </Tooltip>
          </Button>
          <Button mx {...btnProps} onClick={actions.inviteStudentsModal}>
            <Icon name='mail' mr fs='s' />
            Invite Students
            <Tooltip message='Send an email to your students that will instruct them on how to join your class.' align='center center' tooltipProps={{whiteSpace: 'normal', w: '200'}}>
              <Icon name='info' ml='s' fs='xs' />
            </Tooltip>
          </Button>
          <Button {...btnProps} onClick={actions.createStudentModal}>
            <Icon name='edit' mr fs='s' />
            Create New Student
            <Tooltip message='Create a new account for students who have never used Weo before.' align='center center' tooltipProps={{whiteSpace: 'normal', w: '200'}}>
              <Icon name='info' ml='s' fs='xs' />
            </Tooltip>
          </Button>
        </Block>
        <Block fs='s' lighter mx='auto' w='col_m'>
          Or instruct them to sign up at <Text bold>weo.io/student</Text> and
          join your class using the following code:
          <Text fontFamily='monospace' color='blue' ml='s'>
            {group.code}
          </Text>
        </Block>
      </Block>
    )
  },

  controller: {
    * addStudentModal ({props, context}) {
      yield context.openModal(() => <AddStudentModal groupId={props.group._id} />)
    },

    * createStudentModal ({props, context}) {
      yield context.openModal(() => <CreateStudentModal groupId={props.group._id} />)
    },

    * inviteStudentsModal ({props, context}) {
      yield context.openModal(() => <InviteStudentsModal group={props.group} />)
    }
  }
})
