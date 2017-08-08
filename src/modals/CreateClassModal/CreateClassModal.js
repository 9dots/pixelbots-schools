/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import validate from 'lib/validate'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <CreateClassModal/>
 */

export default component({
  render ({props, context, state, actions}) {
    return (
      <Modal onDismiss={context.closeModal} opacity='1'>
        <Form onSubmit={actions.createClass} tall validate={validate.group} autocomplete='off'>
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
              <Text pointer underline onClick={context.closeModal}>cancel</Text>
              <Text mx>or</Text>
            </Text>
            <Button type='submit' busy={state.loading}>Create</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },

  controller: {
    * createClass ({context, actions}, cls) {
      try {
        yield actions.setLoading(true)
        const {key} = yield context.firebasePush('/classes', {
          teacherID: context.userId,
          ...cls
        })

        yield context.firebaseSet(`/users/${context.userId}/teacherOf/${key}`, Date.now())
        yield context.setUrl(`/class/${key}/feed`)
      } catch (e) {
        console.log('e', e)
        yield actions.setLoading(false)
      }
    }
  },

  reducer: {
    setLoading: (state, loading) => ({loading})
  }
})
