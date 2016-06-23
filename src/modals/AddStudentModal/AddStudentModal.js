/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Block, Text} from 'vdux-ui'
import LineInput from 'components/LineInput'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import validate from 'lib/validate'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <UsernameModal/>
 */

function render ({props}) {
  const {createStudent, joinClass} = props

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={studentJoin} onSuccess={closeModal} validate={validateStudent}>
        <ModalBody pb='l' w='col_m' mx='auto'>
          <ModalHeader>
            Add New Student
          </ModalHeader>
          <input type='hidden' name='userType' value='student' />
          <Block align='start center'>
            <LineInput name='name[givenName]' mr='l' placeholder='First Name' />
            <LineInput name='name[familyName]' placeholder='Last Name' />
          </Block>
          <Block align='start center' my='l'>
            <LineInput name='username' mr='l' placeholder='Username' />
            <LineInput name='sisId' placeholder='ID (Optional)' />
          </Block>
          <Block>
            <LineInput name='password' mr placeholder='Password' type='password' />
          </Block>
        </ModalBody>
        <ModalFooter bg='grey'>
          <Text fs='xxs'>
            <Text pointer underline onClick={closeModal}>cancel</Text>
            <Text mx>or</Text>
          </Text>
          <Button type='submit'>Add</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )

  function * studentJoin (model) {
    const user = yield createStudent(model)
    yield joinClass(user.id)
  }
}

/**
 * validateStudent
 */

function validateStudent (model) {
  const result = validate.student(model)
  model.tmpPassword = model.password

  return result
}

/**
 * Exports
 */

export default summon(({groupId}) => ({
  createStudent: body => ({
    newStudent: {
      url: '/auth/user',
      method: 'POST',
      body
    }
  }),
  joinClass: userId => ({
    joiningClass: {
      url: `/group/${groupId}/members/${userId}`,
      method: 'PUT',
      invalidates: [`/group/students?group=${groupId}`]
    }
  })
}))({
  render
})
