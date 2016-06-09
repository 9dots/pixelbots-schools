/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {setUrl} from 'redux-effects-location'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import validate from 'lib/validate'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <CreateClassModal/>
 */

function render ({props}) {
  const {createClass} = props

  return (
    <Modal onDismiss={closeModal} opacity='1'>
      <Form onSubmit={createClass} onSuccess={({_id}) => setUrl(`/class/${_id}/feed`)} tall validate={validate.group} autocomplete='off'>
        <ModalBody>
          <Flex column align='space-around center'>
            <ModalHeader>
              Create Class
            </ModalHeader>
            <RoundedInput my autofocus name='displayName' placeholder='Class name' />
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
  createClass: body => ({
    newClass: {
      url: '/group/',
      method: 'POST',
      invalidates: ['/user/classes', '/user'],
      body
    }
  })
}))({
  render
})
