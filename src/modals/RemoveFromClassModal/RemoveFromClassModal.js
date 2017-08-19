/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Block, Text} from 'vdux-ui'
import {Button, Tooltip} from 'vdux-containers'
import {component, element} from 'vdux'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <RemoveFromClassModal/>
 */

export default component({
  render ({props, actions, context}) {
    const {removing = {}} = props
    const {loading} = removing

    const users = [].concat(props.user)
    const names = users.map(user => user.displayName)

    return (
      <Modal onDismiss={context.closeModal}>
        <Form onSubmit={actions.handleSubmit} onSuccess={context.closeModal}>
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
              <Text pointer underline onClick={context.closeModal}>cancel</Text>
              <Text mx>or</Text>
            </Text>
            <Button type='submit' busy={loading}>Remove</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },

  controller: {
    * handleSubmit ({props, actions}, body) {
      const users = [].concat(props.user)
      yield users.map(({id}) => actions.remove(id))
    },
    * remove ({context, props}, uid) {
      const {groupId} = props

      yield [
        context.firebaseUpdate(`/classes/${groupId}/students`, {
          [uid]: null
        }),
        context.firebaseUpdate(`/users/${uid}/studentOf`, {
          [groupId]: null
        })
      ]
    }
  }
})
