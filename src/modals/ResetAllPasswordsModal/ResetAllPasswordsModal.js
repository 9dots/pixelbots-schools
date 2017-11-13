/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Block, Text} from 'vdux-ui'
import {Button, Tooltip} from 'vdux-containers'
import {component, element} from 'vdux'
import summon from 'vdux-summon'
import Form from 'vdux-form'
import {passwords, getRandomInt} from 'lib/picture-passwords'

/**
 * <RemoveFromClassModal/>
 */

export default component({
  render ({props, actions, context}) {

    return (
      <Modal onDismiss={context.closeModal}>
        <Form onSubmit={actions.changePasswords} onSuccess={context.closeModal}>
          <Flex ui={ModalBody} column align='center center' pb='l'>
            <ModalHeader>
              Reset All Passwords
            </ModalHeader>
            <Block my>
              Are you sure you want to reset all student passwords in this class?
            </Block>
          </Flex>
          <ModalFooter bg='grey'>
            <Text fs='xxs'>
              <Text pointer underline onClick={context.closeModal}>cancel</Text>
              <Text mx>or</Text>
            </Text>
            <Button type='submit'>Change</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },

  controller: {
    * changePasswords ({context, props}) {
      const {users} = props
      for (var user in users) {
        var pw= passwords[getRandomInt(0,24)]
        yield context.firebaseSet(`/users/${users[user].id}/pictureName`, pw)
      }
    }
  }
})
