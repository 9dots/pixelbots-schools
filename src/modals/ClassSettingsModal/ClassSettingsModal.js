/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {closeModal, openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import Confirm from 'modals/Confirm'
import validate from 'lib/validate'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <ClassSettingsModal/>
 */

function render ({props}) {
  const {renameClass, group} = props

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={renameClass} onSuccess={closeModal} cast={changes => ({...group, ...changes})} tall validate={validate.group} autocomplete='off'>
        <ModalBody>
          <Flex column align='space-around center'>
            <ModalHeader>
              Class Settings
            </ModalHeader>
            <RoundedInput my autofocus name='displayName' placeholder='Class name' defaultValue={group.displayName} />
          </Flex>
        </ModalBody>
        <ModalFooter bg='greydark' align='space-between center'>
          <Button bgColor='danger' onClick={deleteClass}>
            Delete
          </Button>
          <Block>
            <Text fs='xxs'>
              <Text pointer underline onClick={closeModal}>cancel</Text>
              <Text mx>or</Text>
            </Text>
            <Button type='submit'>Update</Button>
          </Block>
        </ModalFooter>
      </Form>
    </Modal>
  )

  function deleteClass () {
    return openModal(() => <ConfirmDeleteClass classId={group._id} message={'Are you sure you want to delete your class "' + group.displayName + '?"'}/>)
  }
}

const ConfirmDeleteClass = summon(({classId}) => ({
  onAccept: () => ({
    deleting: {
      url: `/group/${classId}`,
      method: 'DELETE',
      invalidates: ['/user/classes', '/user']
    }
  })
}))(Confirm)

/**
 * Exports
 */

export default summon(({group}) => ({
  renameClass: body => ({
    nameChange: {
      url: `/group/${group._id}`,
      method: 'PUT',
      invalidates: ['/user/classes', '/user'],
      body
    }
  })
}))({
  render
})
