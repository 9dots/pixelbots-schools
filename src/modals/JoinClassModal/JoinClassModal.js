/**
 * Imports
 */

import RoundedInput from 'components/RoundedInput'
import FindClass from 'components/FindClass'
import { component, element } from 'vdux'
import { Button } from 'vdux-containers'
import Form from 'vdux-form'

import {
  ModalHeader,
  ModalFooter,
  ModalBody,
  DecoLine,
  Block,
  Modal,
  Flex,
  Text
} from 'vdux-ui'

/**
 * <JoinClassModal/>
 */

export default component({
  initialState: {
    currentSchool: null,
    currentClass: null
  },

  render ({ props, context, actions, state }) {
    const { enableDismiss } = props
    return (
      <Modal onDismiss={context.closeModal} opacity='1'>
        <Form onSubmit={actions.joinClass} tall autocomplete='off'>
          <ModalBody>
            <Flex column align='space-around center'>
              <ModalHeader>Join Class</ModalHeader>
              <FindClass {...actions} {...state} {...props} />
              <Flex wide align='center center'>
                <DecoLine w='36%' />
                <Block italic m='m'>
                  or
                </Block>
                <DecoLine w='36%' />
              </Flex>
              <RoundedInput
                w={210}
                mx={0}
                autofocus
                name='code'
                placeholder='Enter Class code' />
            </Flex>
          </ModalBody>
          <ModalFooter bg='grey'>
            {
              <Text fs='xxs' hide={!enableDismiss}>
                <Text pointer underline onClick={context.closeModal}>
                  cancel
                </Text>
                <Text mx>or</Text>
              </Text>
            }
            <Button type='submit' busy={state.loading}>
              Join
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },

  controller: {
    * goToClass ({ context }, { _id }) {
      yield context.setUrl(`/class/${_id}/feed`)
    },
    * joinClass ({ props, state, actions, context }, { code }) {
      if (state.currentClass) {
        code = state.currentClass.code
      }
      const codeCaps = (code || '').toUpperCase()

      yield actions.setLoading(true)
      try {
        if (!codeCaps) {
          throw [{ field: 'code', message: 'Invalid class code' }]
        }
        const snap = yield context.firebaseOnce('/class_codes/' + codeCaps)
        const classId = snap.val()
        if (classId) {
          yield context.firebaseSet(
            `/users/${context.userId}/teacherOf/${classId}`,
            true
          )
          yield context.closeModal()
        } else {
          throw [{ field: 'code', message: 'Invalid class code' }]
        }
      } catch (err) {
        yield actions.setLoading(false)
        throw err
      }
    }
  },
  reducer: {
    setSchool: (state, currentSchool) => ({
      currentSchool,
      currentClass: undefined
    }),
    setClass: (state, currentClass) => ({ currentClass }),
    setLoading: (state, loading) => ({ loading })
  }
})
