/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Flex, Text, Block} from 'vdux-ui'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <ClassCodeModal/>
 */

function render ({props}) {
  return (
    <Modal onDismiss={closeModal}>
      <ModalBody w='col_m' m='auto'>
        <Flex column align='space-around center'>
          <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
            Class Code
          </Block>
          <Block mx='auto' fs='s' fw='lighter' textAlign='center' pb lh='30px'>
            Students can sign up at <Text bold>www.weo.io/student</Text>&nbsp;
            and click the Join Class button and enter the code&nbsp;
            <Text color='blue'>59e8p2</Text> to join this class.
          </Block>
        </Flex>
      </ModalBody>
      <ModalFooter bg='grey'>
        <Button onClick={closeModal}>Close</Button>
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
