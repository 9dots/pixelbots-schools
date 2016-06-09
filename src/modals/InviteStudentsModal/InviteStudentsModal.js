/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Block, Text} from 'vdux-ui'
import LineInput from 'components/LineInput'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <InviteStudentsModal/>
 */

function render ({props}) {
  const {sendInvite} = props

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={submit} onSuccess={closeModal}>
        <ModalBody textAlign='center'>
          <ModalHeader>
            Invite Students
          </ModalHeader>
          <LineInput name='emails' w='88%' mx='auto' autofocus />
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
    yield sendInvite(emails.split(',').map(email => email.replace(/\s/g, '')))
  }
}

/**
 * Exports
 */

export default summon(({group}) => ({
  sendInvite: emails => ({
    sendingInvites: {
      url: `/group/${group._id}/invite`,
      method: 'POST',
      body: {
        emails
      }
    }
  })
}))({
  render
})
