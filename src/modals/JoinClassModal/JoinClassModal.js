/**
 * Imports
 */

import {Block, Modal, ModalBody, ModalFooter, ModalHeader, Flex, Text} from 'vdux-ui'
import CreateClassModal from 'modals/CreateClassModal'
import RoundedInput from 'components/RoundedInput'
import {component, element} from 'vdux'
import {Button, Dropdown, MenuItem} from 'vdux-containers'
import mapValues from '@f/map-values'
import summon from 'vdux-summon'
import Form from 'vdux-form'
import fire from 'vdux-fire'
import map from '@f/map'

/**
 * <JoinClassModal/>
 */


export default fire((props) => ({
  userClasses: {
    ref: '/classes',
    list: Object.keys(props.user.teacherOf || {}),
    join: {
      ref: '/schools',
      child: 'school'
    }
  },
  schools: {
    ref: '/schools',
    list: Object.keys(props.user.schools || {}),
    join: {
      ref: '/classes',
      child: 'classes',
      childRef: (val, ref) => map((v, key) => ref.child(key), val.classes || {})
    }
  }


}))(component({
    initialState: {
      currentSchool: null,
      currentClass: null
    },

  render ({props, context, actions, state}) {
    const {enableDismiss, user, schools,userClasses} = props
    const {currentSchool, currentClass} = state
    if (!schools.value) return <span/>
    return (
      <Modal onDismiss={context.closeModal} opacity='1'>
        <Form onSubmit={actions.joinClass} tall autocomplete='off'>
          <ModalBody>
            <Flex column align='space-around center'>
              <ModalHeader>
                Join Class
              </ModalHeader>
              <Flex justify='space-between' align='center'>
                <Dropdown z-index='1' btn={<Button bgColor='white' color='black' text={currentSchool ? currentSchool.name : "Choose a School"} />}>
                  {schools.value ? mapValues(school => <MenuItem onClick={actions.setSchool(school)}> {school.name} </MenuItem>, schools.value) : null}
                </Dropdown>
                <Dropdown z-index='1' btn={<Button bgColor='white' color='black' text={currentClass ? currentClass.displayName : "Choose a Class"} />}>
                  {currentSchool ?  mapValues(currClass => currClass.key in (userClasses.value || {}) ? null :
                                 <MenuItem onClick={actions.setClass(currClass)}> {currClass.displayName} </MenuItem>, currentSchool.classes): null }
                </Dropdown>
              </Flex>
              <Block italic my='m'>or</Block>
              <RoundedInput mb={0} w={210} mx={0} mt autofocus name='code' placeholder='Enter Class code' />
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
    * goToClass ({context}, {_id}) {
      yield context.setUrl(`/class/${_id}/feed`)
    },
    * joinClass ({props, state, actions, context}, {code}) {
      if (state.currentClass) {
        code = state.currentClass.code
      }
      const codeCaps = (code || '').toUpperCase()

      yield actions.setLoading(true)
      try {
        if (!codeCaps) {
          throw [{field: 'code', message: 'Invalid class code'}]
        }
        const snap = yield context.firebaseOnce('/class_codes/' + codeCaps)
        const classId = snap.val()
        if (classId) {
          yield context.firebaseSet(`/users/${context.userId}/teacherOf/${classId}`, true)
          yield context.closeModal()
        } else {
          throw [{field: 'code', message: 'Invalid class code'}]
        }
      } catch (err) {
        yield actions.setLoading(false)
        throw err
      }
    }
  },
  reducer: {
    setSchool: (state, currentSchool) => ({currentSchool}),
    setClass: (state, currentClass) => ({currentClass}),
    setLoading: (state, loading) => ({loading})
  }
}))