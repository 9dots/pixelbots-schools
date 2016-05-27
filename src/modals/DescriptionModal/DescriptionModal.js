/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {Button, Input} from 'vdux-containers'
import {closeModal} from 'reducer/modal'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <DescriptionModal/>
 */

function render ({props}) {
  const {user, changeDescription} = props
  const {aboutMe} = user

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={changeDescription} onSuccess={closeModal}>
        <Flex ui={ModalBody} column align='center center' pt pb='l'>
          <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
            Description
          </Block>
          <RoundedInput defaultValue={aboutMe} name='aboutMe' placeholder='A few words about yourself...' w='300px' m autofocus inputProps={{textAlign: 'left'}}/>
        </Flex>
        <ModalFooter bg='greydark'>
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

export default summon(({user}) => ({
  changeDescription: ({aboutMe}) => ({
    changingDescription: {
      url: '/user',
      method: 'PUT',
      invalidates: `/user/${user._id}`,
      body: {
        ...user,
        aboutMe
      }
    }
  })
}))({
  render
})
