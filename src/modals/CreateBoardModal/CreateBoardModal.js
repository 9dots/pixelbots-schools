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
 * <CreateBoardModal/>
 */

function render ({props}) {
  const {createBoard} = props

  return (
    <Modal onDismiss={closeModal} opacity='1' h={200}>
      <Form onSubmit={createBoard} tall validate={validate.board}>
        <ModalBody>
          <Flex column align='space-around center'>
            <Block mt={25} mb={15} fs='l' fw='lighter' color='blue' textAlign='center'>
              Create Board
            </Block>
            <RoundedInput name='displayName' placeholder='Board name' />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Text fs='xxs'>
            <Text pointer underline onClick={closeModal}>cancel</Text>
             &ensp;or&ensp;
          </Text>
          <Button type='submit' onClick={() => console.log('create')}>Create</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

/**
 * onUpdate - Close the modal if we successfuly create the board
 */

function onUpdate (prev, {props}) {
  const {newBoard = {}} = props

  if (newBoard.loaded) {
    return closeModal()
  }
}

/**
 * Exports
 */

export default summon(props => ({
  createBoard: body => ({
    newBoard: {
      url: '/board/',
      method: 'POST',
      invalidates: '/user/boards',
      body
    }
  })
}), {
  render,
  onUpdate
})
