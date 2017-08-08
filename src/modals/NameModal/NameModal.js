/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Block, Text} from 'vdux-ui'
import {Button, Dropdown, MenuItem} from 'vdux-containers'
import LineInput from 'components/LineInput'
import {component, element} from 'vdux'
import Form from 'vdux-form'

/**
 * <NameModal/>
 */

export default component({
  render ({props, state, actions, context}) {
    const {user} = props
    const {displayName} = user

    return (
      <Modal onDismiss={context.closeModal}>
        <Form onSubmit={actions.changeName} onSuccess={context.closeModal}>
          <Flex ui={ModalBody} column align='center center' pb='l'>
            <ModalHeader>
              Name
            </ModalHeader>
            <Flex align='center center' py>
              <LineInput textAlign='center' name='displayName' placeholder='Name' value={displayName} />
            </Flex>
          </Flex>
          <ModalFooter bg='grey'>
            <Text fs='xxs'>
              <Text pointer underline onClick={context.closeModal}>cancel</Text>
              <Text mx>or</Text>
            </Text>
            <Button type='submit'>Update</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },

  controller: {
    * changeName ({context, props}, data) {
      const {user} = props
      yield context.firebaseSet(`/users/${user.id}/displayName`, data.displayName)
      yield context.closeModal()
    }
  }
})
