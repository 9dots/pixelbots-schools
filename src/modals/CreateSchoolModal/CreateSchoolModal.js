/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Card, ModalHeader, Block} from 'vdux-ui'
import CreateClassModal from 'modals/CreateClassModal'
import JoinSchoolModal from 'modals/JoinSchoolModal'
import RoundedInput from 'components/RoundedInput'
import {Button, Text} from 'vdux-containers'
import {component, element} from 'vdux'
import validate from 'lib/validate'
import Form from 'vdux-form'

/**
 * <CreateSchoolModal/>
 */

export default component({
  render ({props, actions, state, context}) {
    const {enableDismiss} = props
    return (
      <Modal onDismiss={enableDismiss && context.closeModal}>
        <Form onSubmit={actions.createSchool} onSuccess={context.openModal(() => <CreateClassModal userId={context.userId}/> )}>
          <ModalBody py='l' w='col_m' mx='auto'>
            <ModalHeader pb>
              Create a New School
            </ModalHeader>
            <Block align='space-between center' column mt>
              <RoundedInput mb={0} w={210} mx={0} mt autofocus name='name' placeholder='School Name' />
              <Text textDecoration='underline' pointer mt='l' italic opacity='.5' hoverProps={{opacity: .7}} onClick={context.openModal(() => <JoinSchoolModal  enableDismiss={enableDismiss} />)}>
                or go back to join school
              </Text>
            </Block>
          </ModalBody>
          <ModalFooter bg='grey'>
            {
            <Text fs='xxs'  hide={!enableDismiss}>
              <Text pointer underline onClick={context.closeModal}>Cancel</Text>
              <Text mx>or</Text>
            </Text>
            }
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
