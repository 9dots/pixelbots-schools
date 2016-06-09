/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {Button, Input, Tooltip} from 'vdux-containers'
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
  const {changePassword, isMe} = props
  const users = [].concat(props.user)
  const names = users.map(user => user.displayName)

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={handleSubmit} onSuccess={closeModal} validate={validatePassword}>
        <Flex ui={ModalBody} column align='center center' pb='l'>
          <ModalHeader>
            New Password
          </ModalHeader>
          <Block hide={users.length > 1 || isMe} mb>
            Change password for <Text bold color='blue'>{names[0]}</Text>?
          </Block>
          <Block hide={users.length <= 1} mb>
            Change password for these
            <Tooltip
              tooltipProps={{whiteSpace: 'pre-line'}}
              placement='bottom'
              cursor='default'
              display='inline'
              message={names.join('\n')}
              color='blue'
              bold> {users.length} </Tooltip>
              users.
          </Block>
          <RoundedInput type='password' name='password' placeholder='Enter a new password' w='250' m autofocus inputProps={{textAlign: 'left'}}/>
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

  function * handleSubmit (body) {
    yield users.map(user => changePassword(user, body))
  }
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

export default summon(({group}) => {
  let invalidates = []
  if(group._id)
    invalidates.push(`/group/students?group=${group._id}`)
  return {
    changePassword: (user, body) => ({
      changingPassword: {
        url: `/user/${user._id || user.id}/password`,
        method: 'PUT',
        body,
        invalidates
      }
    })
  }
})({
  render
})
