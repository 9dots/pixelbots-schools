/**
 * Imports
 */

import { getRandomPassword } from 'lib/picture-passwords'
import LineInput from 'components/LineInput'
import { component, element } from 'vdux'
import { Button } from 'vdux-containers'
import validate from 'lib/validate'
import Form from 'vdux-form'
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Block,
  Text
} from 'vdux-ui'

/**
 * <Create Student Modal/>
 */

export default component({
  render ({ props, actions, context, state }) {
    const { creatingStudent = {}, joiningClass = {} } = props
    const { fetching } = state
    const loading = creatingStudent.loading || joiningClass.loading
    return (
      <Modal onDismiss={context.closeModal}>
        <Form
          onSubmit={actions.checkStudentCredentials}
          validate={validateStudent}
          autocomplete='off'>
          <ModalBody pb='l' w='col_m' mx='auto'>
            <ModalHeader>Create New Student</ModalHeader>
            <input type='hidden' name='userType' value='student' />
            <Block align='start center'>
              <LineInput
                autofocus
                name='name[givenName]'
                mr='l'
                placeholder='First Name' />
              <LineInput name='name[familyName]' placeholder='Last Name' />
            </Block>
            <Block align='start center' my='l'>
              <LineInput name='username' mr='l' placeholder='Username' />
              <LineInput name='email' placeholder='email (Optional)' />
            </Block>
          </ModalBody>
          <ModalFooter bg='grey'>
            <Text fs='xxs'>
              <Text pointer underline onClick={!fetching && context.closeModal}>
                cancel
              </Text>
              <Text mx>or</Text>
            </Text>
            <Button disabled={fetching} type='submit' busy={loading}>
              Create
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },

  controller: {
    * createStudentAndJoin ({ props, context, actions }, model) {
      const { value } = yield context.fetch(
        `${process.env.API_SERVER}/createNewUser`,
        {
          method: 'POST',
          headers: { 'CONTENT-TYPE': 'application/json' },
          body: JSON.stringify({
            ...model,
            classId: props.groupId,
            email: model.email || undefined,
            pictureName: getRandomPassword()
          })
        }
      )
      yield context.closeModal()
    },
    * addStudentToClass ({ context, props, actions }, user) {
      yield [
        context.firebaseUpdate(`/classes/${props.groupId}/students`, {
          [user.uid]: true
        }),
        context.firebaseUpdate(`/users/${user.uid}/studentOf`, {
          [props.groupId]: true
        })
      ]
      yield context.closeModal()
    },
    * maybeAddPassword ({ context }, studentId) {
      yield context.firebaseTransaction(
        `/users/${studentId}/pictureName`,
        pictureName => pictureName || getRandomPassword()
      )
    },
    * checkStudentCredentials ({ props, context, actions }, model) {
      yield actions.isFetching(true)
      const { value } = yield context.fetch(
        `${process.env.API_SERVER}/checkUserEmail`,
        {
          method: 'POST',
          headers: { 'CONTENT-TYPE': 'application/json' },
          body: JSON.stringify({
            ...model,
            classId: props.groupId,
            email: model.email || undefined
          })
        }
      )
      if (value.status === 'success') {
        yield actions.createStudentAndJoin(model)
      } else {
        const { field, message, user } = value.payload
        if (field === 'email') {
          yield context.openModal(() => (
            <OverwriteStudent
              onAccept={[
                actions.maybeAddPassword(user.uid),
                actions.addStudentToClass(user)
              ]}
              groupId={props.groupId}
              user={user} />
          ))
        } else {
          yield actions.isFetching(false)
          throw [{ field, message }]
        }
      }
    }
  },

  reducer: {
    isFetching: (state, fetching) => ({ fetching })
  }
})

const OverwriteStudent = component({
  render ({ props, state, context }) {
    const { user } = props
    return (
      <Modal onDismiss={context.closeModal}>
        <Form autocomplete='off'>
          <ModalBody pb='l' w='col_m' mx='auto'>
            <ModalHeader>Create New Student</ModalHeader>
            <Block>
              That email is in use for the username <b>{user.username}</b>.
              Would you like to add this person to your class?
            </Block>
          </ModalBody>
          <ModalFooter bg='grey'>
            <Text fs='xxs'>
              <Text pointer underline onClick={context.closeModal}>
                cancel
              </Text>
              <Text mx>or</Text>
            </Text>
            <Button onClick={props.onAccept}>Add To Class</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
})

/**
 * validateStudent
 */

function validateStudent (model) {
  const result = validate.student({
    ...model,
    email: model.email ? model.email : undefined
  })
  model.tmpPassword = model.password

  return result
}
