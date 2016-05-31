/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Block, Text, Icon} from 'vdux-ui'
import LineInput from 'components/LineInput'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <InviteTeacherModal/>
 */

function render ({props}) {
  const {sendInvite} = props

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={submit} onSuccess={closeModal}>
        <ModalBody textAlign='center'>
          <Block pt='l' fs='m' fw='200' color='blue' textAlign='center'>
            Invite Friends to Join Weo!
          </Block>
          <Icon name='local_attraction' fs='75px' m p color='yellow' />
          <LineInput name='emails' w='60%' mx='auto' mt='-12px' autofocus />
          <Block mb='s' mt>
            Enter a list of emails separated by commas
          </Block>
          <Block color='grey_medium' fontStyle='italic' mb='xl'>
            john.doe@gmail.com, jane.doe@gmail.com
          </Block>
        </ModalBody>
        <ModalFooter bg='grey'>
          <Text fs='xxs'>
            <Text pointer underline onClick={closeModal}>cancel</Text>
            <Text mx>or</Text>
          </Text>
          <Button type='submit'>Send!</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )

  function * submit ({emails}) {
    yield emails.split(',').map(email => sendInvite(email.replace(/\s/g, '')))
  }
}

/**
 * Exports
 */

export default summon(props => ({
  sendInvite: email => ({
    sendingInvites: {
      url: '/invite',
      method: 'POST',
      body: {
        email
      }
    }
  })
}))({
  render
})
