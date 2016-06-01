/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Text, Block} from 'vdux-ui'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <ClassCodeModal/>
 */

function render ({props}) {
  const {code} = props
  return (
    <Modal onDismiss={closeModal}>
      <ModalBody m='auto'>
        <Flex column align='space-around center'>
          <ModalHeader>
            Class Code
          </ModalHeader>
          <Block mx='auto' fs='s' fw='lighter' textAlign='center' pb lh='30px'>
            To join this class, students should sign up at <Text bold>www.weo.io/student</Text> and then click the Join Class button to enter the code&nbsp;
            <Text color='blue' bold fontFamily='monospace'>{code}</Text>.
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
