/**
 * Imports
 */

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Flex,
  Block,
  Text
} from 'vdux-ui'
import { Button, Tooltip } from 'vdux-containers'
import { component, element } from 'vdux'
import summon from 'vdux-summon'
import Form from 'vdux-form'
import { passwords, getRandomInt } from 'lib/picture-passwords'

/**
 * <RemoveFromClassModal/>
 */

export default component({
  render ({ props, actions, context }) {
    const { removing = {} } = props
    const { loading } = removing

    const users = [].concat(props.user)
    const names = users.map(user => user.displayName)

    return (
      <Modal onDismiss={context.closeModal}>
        <Form onSubmit={actions.changePassword} onSuccess={context.closeModal}>
          <Flex ui={ModalBody} column align='center center' pb='l'>
            <ModalHeader>Change Student Password</ModalHeader>
            <Block my>
              Are you sure you want to change the password of
              {users.length === 1 ? (
                <Text bold color='blue'>
                  {' '}
                  {users[0].displayName}{' '}
                </Text>
              ) : (
                <Text>
                  {' '}
                  these<Tooltip
                    tooltipProps={{ whiteSpace: 'pre-line' }}
                    placement='bottom'
                    cursor='default'
                    display='inline'
                    message={names.join('\n')}
                    color='blue'
                    bold>
                    {' '}
                    {users.length}{' '}
                  </Tooltip>students{' '}
                </Text>
              )}
              ?
            </Block>
          </Flex>
          <ModalFooter bg='grey'>
            <Text fs='xxs'>
              <Text pointer underline onClick={context.closeModal}>
                cancel
              </Text>
              <Text mx>or</Text>
            </Text>
            <Button type='submit' busy={loading}>
              Change
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },

  controller: {
    * changePassword ({ context, props }) {
      const { user } = props
      var pw = passwords[getRandomInt(0, 24)]
      // console.log(pw)
      yield context.firebaseSet(`/users/${user.id}/pictureName`, pw)
    }
  }
})
