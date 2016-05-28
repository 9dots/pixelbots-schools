/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {Button, Input} from 'vdux-containers'
import {password} from 'lib/schemas/user'
import validate from '@weo-edu/validate'
import {closeModal} from 'reducer/modal'
import Schema from '@weo-edu/schema'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <PasswordModal/>
 */

function render ({props}) {
  const {user, changePassword} = props

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={changePassword} onSuccess={closeModal} validate={validatePassword}>
        <Flex ui={ModalBody} column align='center center' pt pb='l'>
          <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
            New Password
          </Block>
          <RoundedInput type='password' name='password' placeholder='Enter a new password' w='250' m autofocus inputProps={{textAlign: 'left'}}/>
        </Flex>
        <ModalFooter bg='greydark'>
          <Text fs='xxs'>
            <Text pointer underline onClick={closeModal}>cancel</Text>
            <Text mx>or</Text>
          </Text>
          <Button type='submit'>Update</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

/**
 * Validation
 */

const validatePassword = validate(
  Schema()
    .prop('password', password)
    .required('password')
)

/**
 * Exports
 */

export default summon(({user}) => ({
  changePassword: body => ({
    changingPassword: {
      url: `/user/${user._id}/password`,
      method: 'PUT',
      body,
      invalidates: ['/user', `/user/${user._id}`]
    }
  })
}))({
  render
})
