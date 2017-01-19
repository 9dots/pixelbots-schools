/**
 * Imports
 */

import {Modal, ModalFooter, ModalBody, Flex, ModalHeader, Text} from 'vdux-ui'
import LineInput from 'components/LineInput'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <SchoolLocationModal/>
 */

export default summon(({school}) => ({
  changeLocation: model => ({
    changingLocation: {
      url: `/school/${school._id}/location`,
      method: 'PUT',
      body: {
        value: model.location
      }
    }
  })
}))(component({
  render ({props, context}) {
    const {changeLocation, changingLocation = {}, school} = props

    return (
      <Modal onDismiss={context.closeModal} opacity='1'>
        <Form onSubmit={changeLocation} onSuccess={context.closeModal} tall autocomplete='off'>
          <ModalBody>
            <Flex column align='space-around center'>
              <ModalHeader>
                Change School Location
              </ModalHeader>
              <LineInput my autofocus name='location' value={school.location} placeholder='Where is your school located?' />
            </Flex>
          </ModalBody>
          <ModalFooter bg='grey'>
            <Text fs='xxs'>
              <Text pointer underline onClick={context.closeModal}>cancel</Text>
              <Text mx>or</Text>
            </Text>
            <Button type='submit' busy={changingLocation.loading}>Change</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}))
