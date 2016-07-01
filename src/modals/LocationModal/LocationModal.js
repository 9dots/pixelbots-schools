/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {Button, Input} from 'vdux-containers'
import {closeModal} from 'reducer/modal'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <LocationModal/>
 */

function render ({props}) {
  const {user, changeLocation, changingLocation = {}} = props
  const {loading} = changingLocation
  const {location} = user

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={changeLocation} onSuccess={closeModal}>
        <Flex ui={ModalBody} column align='center center' pb='l'>
          <ModalHeader>
            Location
          </ModalHeader>
          <RoundedInput defaultValue={location} name='location' placeholder='Where are you located?' w='250px' m autofocus inputProps={{textAlign: 'left'}}/>
        </Flex>
        <ModalFooter bg='grey'>
          <Text fs='xxs'>
            <Text pointer underline onClick={closeModal}>cancel</Text>
            <Text mx>or</Text>
          </Text>
          <Button type='submit' busy={loading}>Update</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

/**
 * Exports
 */

export default summon(({user}) => ({
  changeLocation: ({location}) => ({
    changingLocation: {
      url: '/user',
      method: 'PUT',
      body: {
        ...user,
        location
      }
    }
  })
}))({
  render
})
