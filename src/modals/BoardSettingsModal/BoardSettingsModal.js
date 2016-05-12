/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import validate from 'lib/validate'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <BoardSettingsModal/>
 */

function render ({props}) {
  const {renameBoard, board} = props

  return (
    <Modal onDismiss={closeModal} opacity='1' h={200}>
      <Form onSubmit={renameBoard} onSuccess={closeModal} cast={changes => ({...board, ...changes})} tall validate={validate.board} autocomplete='off'>
        <ModalBody>
          <Flex column align='space-around center'>
            <Block mt={25} mb={15} fs='l' fw='lighter' color='blue' textAlign='center'>
              Board Settings
            </Block>
            <RoundedInput autofocus name='displayName' placeholder='Board name' defaultValue={board.displayName} />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Text fs='xxs'>
            <Text pointer underline onClick={closeModal}>cancel</Text>
             &ensp;or&ensp;
          </Text>
          <Button type='submit'>Update</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  renameBoard: body => ({
    nameChange: {
      url: `/board/${props.board._id}`,
      method: 'PUT',
      invalidates: '/user/boards',
      body
    }
  })
}))({
  render
})
