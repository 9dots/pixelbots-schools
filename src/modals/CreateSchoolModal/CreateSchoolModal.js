/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Card, ModalHeader, Block, Text} from 'vdux-ui'
import JoinSchoolModal from 'modals/JoinSchoolModal'
import LineInput from 'components/LineInput'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import validate from 'lib/validate'
import Form from 'vdux-form'

/**
 * <CreateSchoolModal/>
 */

export default component({
  render ({props, actions, state, context}) {
    return (
      <Modal onDismiss={context.closeModal}>
        <Form onSubmit={actions.createSchool} onSuccess={context.closeModal}>
          <ModalBody py='l' w='col_m' mx='auto'>
            <ModalHeader pb>
              Create a New School
            </ModalHeader>
            <Block mb='l'  textAlign='center'>
              Enter your school name below to create a new school.
            </Block>
            <Block w='250' m='0 auto 12px'>
              <LineInput autofocus name='name' placeholder='School Name' mb='l' />
            </Block>
            <Block>or</Block>
            <Button onClick={context.openModal(() => <JoinSchoolModal />)}>Join an existing school</Button>
          </ModalBody>
          <ModalFooter bg='grey'>
            <Text fs='xxs'>
              <Text pointer underline onClick={context.closeModal}>Cancel</Text>
              <Text mx>or</Text>
            </Text>
            <Button type='submit' busy={state.loading}>Create</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },

  controller: {
    * createSchool ({actions, context}, {name}) {
      yield actions.setLoading(true)

      try {
        const {key} = yield context.firebasePush('/schools', {
          name,
          teachers: {
            [context.userId]: true
          }
        })

        yield context.firebaseSet(`/users/${context.userId}/schools/${key}`, true)
        yield context.closeModal()
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
