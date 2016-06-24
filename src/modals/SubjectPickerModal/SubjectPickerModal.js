/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Block, Text} from 'vdux-ui'
import SubjectSelector from 'components/SubjectSelector'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * initialState
 */

function initialState ({props}) {
  const {user} = props
  const {subjects = []} = user

  return {
    subjects
  }
}

/**
 * <SubjectPickerModal/>
 */

function render ({props, state, local}) {
  const {user, changeSubjects, onClose = () => {}} = props
  const {subjects} = state

  return (
    <Modal onDismiss={close}>
      <Form onSubmit={() => changeSubjects(subjects)} onSuccess={close}>
        <Flex ui={ModalBody} column align='center center' pb='l'>
          <ModalHeader>
            Subjects
          </ModalHeader>
          <SubjectSelector selected={subjects} toggle={local(toggle)} />
        </Flex>
        <ModalFooter bg='grey'>
          <Text fs='xxs'>
            <Text pointer underline onClick={close}>cancel</Text>
            <Text mx>or</Text>
          </Text>
          <Button type='submit'>Update</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )

  function * close () {
    yield closeModal()
    yield onClose()
  }
}

/**
 * Actions
 */

const toggle = createAction('<SubjectPickerModal/>: toggle subject')

/**
 * Reducer
 */

const reducer = handleActions({
  [toggle]: (state, subject) => ({
    ...state,
    subjects: state.subjects.indexOf(subject) === -1
      ? [...state.subjects, subject]
      : state.subjects.filter(s => s !== subject)
  })
})

/**
 * Exports
 */

export default summon(({user}) => ({
  changeSubjects: subjects => ({
    changingSubjects: {
      url: `/user/${user._id}/subjects`,
      method: 'PUT',
      invalidates: '/user',
      body: {
        subjects
      }
    }
  })
}))({
  initialState,
  render,
  reducer
})
