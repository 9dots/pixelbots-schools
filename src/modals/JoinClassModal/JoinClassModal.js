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
 * <JoinClassModal/>
 */

function render ({props}) {
  const {joinClass, joiningClass = {}} = props
  const {loading} = joiningClass

  return (
    <Modal onDismiss={closeModal} opacity='1'>
      <Form onSubmit={joinClass} onSuccess={({_id}) => setUrl(`/class/${_id}/feed`)} tall autocomplete='off'>
        <ModalBody>
          <Flex column align='space-around center'>
            <ModalHeader>
              Join Class
            </ModalHeader>
            <RoundedInput my autofocus name='code' placeholder='Enter Class code' />
          </Flex>
        </ModalBody>
        <ModalFooter bg='grey'>
          <Text fs='xxs'>
            <Text pointer underline onClick={closeModal}>cancel</Text>
             <Text mx>or</Text>
          </Text>
          <Button type='submit' busy={loading}>Create</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  joinClass: ({code}) => ({
    joiningClass: {
      url: `/group/join/${code}`,
      method: 'PUT',
      invalidates: ['/user/classes', '/user'],
    }
  })
}))({
  render
})
