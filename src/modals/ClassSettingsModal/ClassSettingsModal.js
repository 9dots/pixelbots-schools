/**
 * Imports
 */

import {
  Checkbox,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Flex,
  Block,
  Text
} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import { component, element } from 'vdux'
import { Button } from 'vdux-containers'
import Confirm from 'modals/Confirm'
import validate from 'lib/validate'
import Form from 'vdux-form'

/**
 * <ClassSettingsModal/>
 */

export default component({
  initialState ({ props }) {
    return { passwordSetting: props.passwordSetting }
  },

  render ({ state, props, context, actions }) {
    const { group } = props
    const { passwordSetting } = state
    return (
      <Modal onDismiss={context.closeModal}>
        <Form
          onSubmit={actions.submitForm}
          onSuccess={context.closeModal}
          cast={changes => ({ ...group, ...changes })}
          tall
          validate={validate.group}
          autocomplete='off'>
          <ModalBody>
            <Flex column align='space-around center'>
              <ModalHeader>Class Settings</ModalHeader>
              <RoundedInput
                my
                autofocus
                name='displayName'
                placeholder='Class name'
                defaultValue={group.displayName} />
              <Checkbox
                name='passwordSetting'
                checked={passwordSetting}
                onChange={actions.toggle}
                label='Students have Picture Passwords' />
            </Flex>
          </ModalBody>
          <ModalFooter bg='grey' align='space-between center'>
            <Button bgColor='danger' onClick={actions.deleteClass}>
              Delete
            </Button>
            <Block>
              <Text fs='xxs'>
                <Text pointer underline onClick={context.closeModal}>
                  cancel
                </Text>
                <Text mx>or</Text>
              </Text>
              <Button type='submit'>Update</Button>
            </Block>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },

  controller: {
    * deleteClass ({ props, context, actions }) {
      const { groupId } = props
      const isCurrentClass = context.currentUrl.indexOf(groupId) !== -1

      yield context.openModal(() => (
        <ConfirmDeleteModal
          redirect={isCurrentClass && '/class/all'}
          {...props} />
      ))
    },

    * submitForm ({ props, actions }, { displayName }) {
      yield actions.renameClass({ displayName })
      yield actions.setPasswordType()
    },

    * renameClass ({ context, props }, { displayName }) {
      yield context.firebaseUpdate(`/classes/${props.groupId}`, { displayName })
    },

    * setPasswordType ({ state, context, props }) {
      yield context.firebaseSet(
        `/classes/${props.groupId}/hasPicturePassword`,
        state.passwordSetting
      )
      if (state.passwordSetting && props.onPasswordAdd) {
        yield props.onPasswordAdd()
      }
    }
  },

  reducer: {
    setLoading: () => ({}),
    toggle: state => ({ passwordSetting: !state.passwordSetting })
  }
})

/**
 * <ConfirmDeleteModal/>
 */

const ConfirmDeleteModal = component({
  render ({ props, actions }) {
    const { group } = props

    return (
      <Confirm
        onAccept={actions.deleteClass}
        message={
          'Are you sure you want to delete your class "' +
          group.displayName +
          '?"'
        } />
    )
  },

  controller: {
    * deleteClass ({ props, context }) {
      const { group, groupId, redirect } = props

      if (redirect) {
        yield context.setUrl(redirect)
      }

      yield [
        context.firebaseSet(
          `/users/${context.userId}/teacherOf/${groupId}`,
          null
        ),
        context.firebaseSet('/classes/' + groupId, null),
        context.firebaseSet(
          `/schools/${group.school.key}/classes/${groupId}`,
          null
        ),
        ...Object.keys(group.students || {}).map(studentRef =>
          context.firebaseSet(`/users/${studentRef}/studentOf/${groupId}`, null)
        )
      ]
    }
  }
})
