/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Flex, Block, Text} from 'vdux-ui'
import GradeSelector from 'components/GradeSelector'
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

  return {
    gradeLevels: user.gradeLevels || []
  }
}

/**
 * <GradePickerModal/>
 */

function render ({props, state, local}) {
  const {changeGradeLevels} = props
  const {gradeLevels} = state

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={() => changeGradeLevels(gradeLevels)} onSuccess={closeModal}>
        <Flex ui={ModalBody} column align='center center' pt pb='l'>
          <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
            Select Your Grades
          </Block>
          <GradeSelector selected={gradeLevels} toggle={local(toggle)} />
        </Flex>
        <ModalFooter bg='greydark'>
          <Text fs='xxs'>
            <Text pointer underline onClick={closeModal}>cancel</Text>
            <Text mx>or</Text>
          </Text>
          <Button type='submit'>Update</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

/**
 * Actions
 */

const toggle = createAction('<GradePickerModal/>: toggle grade level')

/**
 * Reducer
 */

const reducer = handleActions({
  [toggle]: (state, grade) => ({
    ...state,
    gradeLevels: state.gradeLevels.indexOf(grade) === -1
      ? [...state.gradeLevels, grade]
      : state.gradeLevels.filter(g => g !== grade)
  })
})

/**
 * Exports
 */

export default summon(({user}) => ({
  changeGradeLevels: gradeLevels => ({
    changingGradeLevels: {
      url: '/user',
      method: 'PUT',
      invalidates: `/user/${user._id}`,
      body: {
        ...user,
        gradeLevels
      }
    }
  })
}))({
  initialState,
  render,
  reducer
})
