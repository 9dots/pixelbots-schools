/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {Button} from 'vdux-containers'
import {closeModal} from 'reducer/modal'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <RemoveFromClassModal/>
 */

function render ({props}) {
  const {remove, group} = props
  const users = [].concat(props.user)
  console.log('remove modal group', group)

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={handleSubmit} onSuccess={closeModal}>
        <Flex ui={ModalBody} column align='center center' pb='l'>
          <ModalHeader>
            Remove From Class
          </ModalHeader>
          <Block my>
            Are you sure you want to remove
            <Text bold color='blue'> {users.length}</Text> student
            <Text hide={users.length <= 1}>s</Text> from this class?
          </Block>
        </Flex>
        <ModalFooter bg='grey'>
          <Text fs='xxs'>
            <Text pointer underline onClick={closeModal}>cancel</Text>
            <Text mx>or</Text>
          </Text>
          <Button type='submit'>Remove</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )

  function * handleSubmit (body) {
    yield users.map(user => remove(user, group))
  }
}

/**
 * Exports
 */

export default summon(() => ({
  remove: (user, group) => ({
    removeStudent: {
      url: `/group/${group._id}/members/${user._id || user.id}`,
      method: 'DELETE',
      invalidates: `/group/students?group=${group._id}`,
    }
  })
}))({
  render
})
