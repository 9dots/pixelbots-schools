/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import validate from 'lib/validate'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <JoinClassModal/>
 */

export default summon(props => ({
  joinClass: ({code}) => ({
    joiningClass: {
      url: `/group/join/${code}`,
      method: 'PUT',
      invalidates: ['/user/classes', '/user'],
    }
  })
}))(component({
  render ({props, context, actions}) {
    const {joinClass, joiningClass = {}} = props
    const {loading} = joiningClass

    return (
      <Modal onDismiss={context.closeModal} opacity='1'>
        <Form onSubmit={joinClass} onSuccess={actions.goToClass} tall autocomplete='off'>
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
              <Text pointer underline onClick={context.closeModal}>cancel</Text>
               <Text mx>or</Text>
            </Text>
            <Button type='submit' busy={loading}>Create</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },

  events: {
    * goToClass ({context}, {_id}) {
      yield context.setUrl(`/class/${_id}/feed`)
    }
  }
}))
