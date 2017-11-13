/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Block, Text} from 'vdux-ui'
import LineInput from 'components/LineInput'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import validate from 'lib/validate'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <Create Student Modal/>
 */

export default component({
  render ({props, actions, context, state}) {
    const {creatingStudent = {}, joiningClass = {}} = props
    const {fetching} = state
    const loading = creatingStudent.loading || joiningClass.loading

    return (
      <Modal onDismiss={context.closeModal}>
        <Form onSubmit={actions.checkStudentCredentials} autocomplete='off'>
          <ModalBody pb='l' w='col_m' mx='auto'>
            <ModalHeader>
              Add an Existing Student
            </ModalHeader>
            <input type='hidden' name='userType' value='student' />
            <Block align='start center' my='l'>
              <LineInput name='username' mr='l' placeholder='Username' />
            </Block>
          </ModalBody>
          <ModalFooter bg='grey'>
            <Text fs='xxs'>
              <Text pointer underline onClick={!fetching && context.closeModal}>cancel</Text>
              <Text mx>or</Text>
            </Text>
            <Button disabled={fetching} type='submit' busy={loading}>Create</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },

  controller: {
    * addStudentToClass ({context, props}, uid) {
      yield [
        context.firebaseUpdate(`/classes/${props.groupId}/students`, {
          [uid]: true
        }),
        context.firebaseUpdate(`/users/${uid}/studentOf`, {
          [props.groupId]: true
        })
      ]
      yield context.closeModal()
    },
    * checkStudentCredentials ({props, context, actions}, model) {
      yield actions.isFetching(true)
      const {value} = yield context.fetch(`${process.env.CLOUD_FUNCTION_SERVER}/checkUsername`, {
        method: 'POST',
        headers: {'CONTENT-TYPE': 'application/json'},
        body: JSON.stringify({...model, classId: props.groupId})
      })
      if (value.status === 'success') {
        yield actions.addStudentToClass(value.payload.uid)
      } else {
        console.log(value.payload)
        const {field, message, user} = value.payload
        console.log(field, message, user)
        if (field === 'email') {
          yield context.openModal(() => <OverwriteStudent {...actions} groupId={props.groupId} user={user} />)
        } else {
          yield actions.isFetching(false)
          throw ([{field, message}])
        }
      }
    }
  },

  reducer: {
    isFetching: (state, fetching) => ({fetching})
  }
})

const OverwriteStudent = component({
  initialState ({props}) {
    return {
      user: props.user
    }
  },
  render ({props, state, context}) {
    const {fetching, user} = state
    const [firstName, lastName] = user.username
    return (
      <Modal onDismiss={context.closeModal}>
        <Form  autocomplete='off'>
          <ModalBody pb='l' w='col_m' mx='auto'>
            <ModalHeader>
              Create New Student
            </ModalHeader>
            <Block>
              That email is in use for the username <b>{user.username}</b>. Would you like to add this person to your class?
            </Block>
          </ModalBody>
          <ModalFooter bg='grey'>
            <Text fs='xxs'>
              <Text pointer underline onClick={!fetching && context.closeModal}>cancel</Text>
              <Text mx>or</Text>
            </Text>
            <Button onClick={props.addStudentToClass(user)}>Add To Class</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },
  reducer: {
    isFetching: (state, fetching) => ({fetching}),
    updateUser: (state, obj) => ({...state.user, ...obj})
  }
})

