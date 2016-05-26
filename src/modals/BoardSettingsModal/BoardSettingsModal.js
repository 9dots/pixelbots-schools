/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {closeModal, openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import Confirm from 'modals/Confirm'
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
    <Modal onDismiss={closeModal} opacity='1'>
      <Form onSubmit={renameBoard} onSuccess={closeModal} cast={changes => ({...board, ...changes})} tall validate={validate.board} autocomplete='off'>
        <ModalBody>
          <Flex column align='space-around center'>
            <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
              Board Settings
            </Block>
            <RoundedInput my autofocus name='displayName' placeholder='Board name' defaultValue={board.displayName} />
          </Flex>
        </ModalBody>
        <ModalFooter bg='greydark' align='space-between center'>
          <Button bgColor='danger' onClick={deleteBoard}>
            Delete
          </Button>
          <Block>
            <Text fs='xxs'>
              <Text pointer underline onClick={closeModal}>cancel</Text>
              <Text mx>or</Text>
            </Text>
            <Button type='submit'>Update</Button>
          </Block>
        </ModalFooter>
      </Form>
    </Modal>
  )

  function deleteBoard() {
    return openModal(() => <ConfirmDeleteBoard boardId={board._id} message={'Are you sure you want to delete your board "' +  board.displayName + '?"'}/>)
  }
}

const ConfirmDeleteBoard = summon(({boardId}) => ({
  onAccept: () => ({
    deleting: {
      url: `/board/${boardId}`,
      method: 'DELETE',
      invalidates: '/user/boards'
    }
  })
}))(Confirm)

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
