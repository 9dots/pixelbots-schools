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
    <Modal onDismiss={closeModal}>
      <Form onSubmit={createBoard} onSuccess={closeModal} tall validate={validate.board} autocomplete='off'>
        <ModalBody>
          <Flex column align='space-around center'>
            <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
              Create Board
            </Block>
            <RoundedInput my autofocus name='displayName' placeholder='Board name' />
          </Flex>
        </ModalBody>
        <ModalFooter bg='grey'>
          <Text fs='xxs'>
            <Text pointer underline onClick={closeModal}>cancel</Text>
             <Text mx>or</Text>
          </Text>
          <Button type='submit'>Create</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  createBoard: body => ({
    newBoard: {
      url: '/board/',
      method: 'POST',
      invalidates: ['/user/boards', '/user'],
      body
    }
  })
}))({
  render
})
