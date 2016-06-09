/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {Button, Input} from 'vdux-containers'
import {username} from 'lib/schemas/user'
import validate from '@weo-edu/validate'
import {closeModal} from 'reducer/modal'
import Schema from '@weo-edu/schema'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <UsernameModal/>
 */

function render ({props}) {
  const {user, changeUsername} = props

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={changeUsername} onSuccess={closeModal} validate={validateUsername}>
        <Flex ui={ModalBody} column align='center center' pb='l'>
          <ModalHeader>
            Change Username
          </ModalHeader>
          <RoundedInput
            name='username'
            defaultValue={user.username}
            placeholder='Change your username'
            w='250px'
            m
            autofocus
            inputProps={{textAlign: 'left'}} />
        </Flex>
        <ModalFooter bg='grey'>
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

const validateUsername = validate(
  Schema()
    .prop('username', username)
    .required('username')
)

/**
 * Exports
 */

export default summon(({user, group}) => {
  let invalidates = ['/user', `/user/${user._id}`]
  if(group)
    invalidates.push(`/group/students?group=${group._id}`)
  return {
    changeUsername: body => ({
      changingUsername: {
        url: `/user/${user._id}/username`,
        method: 'PUT',
        body,
        invalidates
      }
    })
  }
})({
  render
})
