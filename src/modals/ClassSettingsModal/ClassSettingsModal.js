/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
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
    <Modal onDismiss={closeModal} opacity='1'>
      <Form onSubmit={renameClass} onSuccess={closeModal} cast={changes => ({...group, ...changes})} tall validate={validate.group} autocomplete='off'>
        <ModalBody>
          <Flex column align='space-around center'>
            <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
              Class Settings
            </Block>
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

  function *deleteClass () {
    yield props.deleteClass()
    yield closeModal()
  }
}

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
  }),
  deleteClass: () => ({
    deleting: {
      url: `/group/${group._id}`,
      method: 'DELETE',
      invalidates: ['/user/classes', '/user']
    }
  })
}))({
  render
})
