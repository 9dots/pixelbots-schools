/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Block, Text} from 'vdux-ui'
import LineInput from 'components/LineInput'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <UsernameModal/>
 */

function render ({props}) {

  return (
    <Modal onDismiss={closeModal}>
      <ModalBody pb='l' w='col_m' mx='auto'>
        <ModalHeader>
          Add New Student
        </ModalHeader>
        <Block align='start center'>
          <LineInput mr='l' placeholder='First Name' />
          <LineInput placeholder='Last Name' />
        </Block>
        <Block align='start center' my='l'>
          <LineInput mr='l' placeholder='UserName' />
          <LineInput placeholder='ID (Optional)' />
        </Block>
        <Block>
          <LineInput mr placeholder='Password' type='password'/>
        </Block>
      </ModalBody>
      <ModalFooter bg='grey'>
        <Text fs='xxs'>
          <Text pointer underline onClick={closeModal}>cancel</Text>
          <Text mx>or</Text>
        </Text>
        <Button type='submit'>Add</Button>
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
