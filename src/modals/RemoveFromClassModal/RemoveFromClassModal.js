/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {Button, Tooltip} from 'vdux-containers'
import summon, {invalidate} from 'vdux-summon'
import {closeModal} from 'reducer/modal'
import element from 'vdux/element'
import Form from 'vdux-form'

/**
 * <RemoveFromClassModal/>
 */

function render ({props}) {
  const {remove, group} = props
  const users = [].concat(props.user)
  const names = users.map(user => user.displayName)

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={handleSubmit} onSuccess={closeModal}>
        <Flex ui={ModalBody} column align='center center' pb='l'>
          <ModalHeader>
            Remove From Class
          </ModalHeader>
          <Block my>
            Are you sure you want to remove
            {
              users.length === 1
                ? <Text bold color='blue'> {users[0].displayName} </Text>
                : <Text> these<Tooltip
                    tooltipProps={{whiteSpace: 'pre-line'}}
                    placement='bottom'
                    cursor='default'
                    display='inline'
                    message={names.join('\n')}
                    color='blue'
                    bold> {users.length} </Tooltip>students </Text>
            }
            from this class?
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
    yield invalidate(`/group/students?group=${group._id}`)
  }
}

/**
 * Exports
 */

export default summon(() => ({
  remove: (user, group) => ({
    removeStudent: {
      url: `/group/${group._id}/members/${user._id || user.id}`,
      method: 'DELETE'
    }
  })
}))({
  render
})
