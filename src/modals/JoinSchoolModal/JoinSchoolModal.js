/**
 * Imports
 */

import {Flex, Modal, ModalBody, ModalFooter, ModalHeader, Block, Text} from 'vdux-ui'
import CreateSchoolModal from 'modals/CreateSchoolModal'
import RoundedInput from 'components/RoundedInput'
import JoinSchool from 'components/JoinSchool'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import Form from 'vdux-form'
import fire from 'vdux-fire'

/**
 * <JoinSchoolModal/>
 */

export default component({
  render ({props, actions, state, context}) {
    const {enableDismiss} = props

    return (
      <Modal opacity='1' onDismiss={enableDismiss && context.closeModal}>
        <Form onSubmit={actions.joinSchool} onSuccess={context.closeModal} tall autocomplete='off'>
          <ModalBody>
            <Flex column align='space-around center'>
              <ModalHeader>
                Join School
              </ModalHeader>
              <RoundedInput mb={0} w={210} mx={0} mt autofocus name='code' placeholder='Enter School code' />
              <Block italic my='m'>or</Block>
              <Button mb='l' w={200} py='s' onClick={context.openModal(() => <CreateSchoolModal enableDismiss={enableDismiss} />)}>Create a School</Button>
            </Flex>
          </ModalBody>
          <ModalFooter bg='grey'>
            {
            <Text fs='xxs' hide={!enableDismiss}>
              <Text pointer underline onClick={context.closeModal}>cancel</Text>
              <Text mx>or</Text>
            </Text>
            }
            <Button type='submit' busy={state.loading}>Join</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },

  controller: {
    * joinSchool ({props, actions, context}, code) {
      yield actions.setLoading(true)
      try {
        const snap = yield context.firebaseOnce('/school_codes/' + code)
        const schoolId = snap.val()

        if (schoolId) {
          yield context.firebaseSet(`/schools/${schoolId}/teachers/${context.userId}`, true)
          yield context.firebaseSet(`/users/${context.userId}/schools/${schoolId}`, true)
          yield context.closeModal()
        } else {
          throw [{field: 'code', message: 'Invalid school code'}]
        }

      } catch (err) {
        yield actions.setLoading(false)
        throw err
      }
    }
  },

  reducer: {
    setLoading: (state, loading) => ({loading})
  }
})
