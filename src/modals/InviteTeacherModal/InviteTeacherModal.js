/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Block, Text, Icon} from 'vdux-ui'
import LineInput from 'components/LineInput'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <InviteTeacherModal/>
 */

function render ({props}) {
  return (
    <Modal onDismiss={closeModal}>
      <ModalBody textAlign='center'>
        <Block pt='l' fs='m' fw='200' color='blue' textAlign='center'>
          Invite Friends to Join Weo!
        </Block>
        <Icon name='local_attraction' fs='75px' m p color='yellow' />
        <LineInput w='60%' mx='auto' mb='xl' mt='-12px' autofocus placeholder='Email address (comma separated for multiple)'/>
      </ModalBody>
      <ModalFooter bg='greydark'>
        <Text fs='xxs'>
          <Text pointer underline onClick={closeModal}>cancel</Text>
          <Text mx>or</Text>
        </Text>
        <Button type='submit'>Send!</Button>
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
