/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <IdModal/>
 */

function render ({props}) {
  const {user, changeId} = props

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={changeId} onSuccess={closeModal}>
        <Flex ui={ModalBody} column align='center center' pb='l'>
          <ModalHeader>
            Change Student ID
          </ModalHeader>
          <RoundedInput
            name='sisId'
            defaultValue={user.sisId}
            placeholder='Change ID'
            w='250px'
            m
            autofocus
            inputProps={{textAlign: 'left'}} />
        </Flex>
        <ModalFooter bg='grey'>
          <Text fs='xxs'>
            <Text pointer underline onClick={closeModal}>cancel</Text>
            <Text mx>or</Text>
          </Text>
          <Button type='submit'>Update</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

/**
 * Exports
 */

export default summon(({user, group}) => {
  let invalidates = ['/user', `/user/${user._id}`]
  if(group)
    invalidates.push(`/group/students?group=${group._id}`)
  return {
    changeId: body => ({
      changingId: {
        url: `/user/${user._id}/sis`,
        method: 'PUT',
        body,
        invalidates
      }
    })
  }
})({
  render
})
