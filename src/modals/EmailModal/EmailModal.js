/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {Button, Input} from 'vdux-containers'
import {closeModal} from 'reducer/modal'
import validate from '@weo-edu/validate'
import {email} from 'lib/schemas/user'
import Schema from '@weo-edu/schema'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <EmailModal/>
 */

function render ({props}) {
  const {user, changeEmail} = props

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={changeEmail} onSuccess={closeModal} validate={validateEmail}>
        <Flex ui={ModalBody} column align='center center' pt pb='l'>
          <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
            Email
          </Block>
          <RoundedInput
            defaultValue={user.email}
            name='email'
            placeholder='Please enter your email'
            w='300px'
            m
            autofocus
            inputProps={{textAlign: 'left'}} />
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

const validateEmail = validate(
  Schema()
    .prop('email', email)
    .required('email')
)

/**
 * Exports
 */

export default summon(({user}) => ({
  changeEmail: body => ({
    changingEmail: {
      url: `/user/${user._id}/email`,
      method: 'PUT',
      body,
      invalidates: ['/user', `/user/${user._id}`]
    }
  })
}))({
  render
})
