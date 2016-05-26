/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Flex, Block, Text} from 'vdux-ui'
import {Button} from 'vdux-containers'
import GradeSelector from 'components/GradeSelector'
import {closeModal} from 'reducer/modal'
import element from 'vdux/element'

/**
 * <GradePickerModal/>
 */

function render ({props}) {
  const {user} = props
  return (
    <Modal onDismiss={closeModal}>
      <Flex ui={ModalBody} column align='center center' pt pb='l'>
        <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
          Select Your Grades
        </Block>
        <GradeSelector selected={user.grades || []} />
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
