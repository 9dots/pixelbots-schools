/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Text, Block, Flex, Icon} from 'vdux-ui'
import AvatarPickerModal from 'modals/AvatarPickerModal'
import {closeModal, openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <AvatarUploadModal/>
 */

function render ({props}) {
  const {user} = props
  console.log(user)
  return (
    <Modal>
      <ModalBody pb>
        <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
          Upload an Avatar
        </Block>
        <Block minHeight={360}>
          Upload
        </Block>
      </ModalBody>
      <ModalFooter bg='greydark'>
        <Block flex>
          <Button bgColor='black' mr='s' h='30' px='25' onClick={() => openModal(() => <AvatarPickerModal user={user} />)}>
            <Flex align='center center'>
              <Icon name='keyboard_arrow_left' fs='s' mr='s' />
              Back
            </Flex>
          </Button>
        </Block>
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
