/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <IdModal/>
 */

export default component({
  render ({props, context, actions}) {
    const {user} = props

    return (
      <Modal onDismiss={context.closeModal}>
        <Form onSubmit={actions.changeId} onSuccess={context.closeModal}>
          <Flex ui={ModalBody} column align='center center' pb='l'>
            <ModalHeader>
              Change Student ID
            </ModalHeader>
            <RoundedInput
              name='sisId'
              defaultValue={user.sisId}
              placeholder='Change ID'
              w='250px'
              m
              autofocus
              inputProps={{textAlign: 'left'}} />
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
    * changeId ({context, props}, {sisId}) {
      yield context.firebaseSet(`/users/${props.user.id}/sisId`, sisId)
      yield context.closeModal()
    }
  }
})
