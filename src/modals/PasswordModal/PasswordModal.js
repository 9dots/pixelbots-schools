/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Flex, Block, Text} from 'vdux-ui'
import {Button, Input} from 'vdux-containers'
import RoundedInput from 'components/RoundedInput'
import {closeModal} from 'reducer/modal'
import element from 'vdux/element'

/**
 * <PasswordModal/>
 */

function render ({props}) {
  const {user} = props
  return (
    <Modal onDismiss={closeModal}>
      <Flex ui={ModalBody} column align='center center' pt pb='l'>
        <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
          New Password
        </Block>
        <RoundedInput type='password' placeholder='Enter a new password' w='300px' m autofocus inputProps={{textAlign: 'left'}}/>
      </Flex>
      <ModalFooter bg='greydark'>
        <Text fs='xxs'>
          <Text pointer underline onClick={closeModal}>cancel</Text>
          <Text mx>or</Text>
        </Text>
        <Button type='submit'>Update</Button>
      </ModalFooter>
    </Modal>
  )
}

/**
 * Exports
 */

export default {
  render
}
