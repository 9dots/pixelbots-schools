/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Card, ModalHeader, Block, Text} from 'vdux-ui'
import LineInput from 'components/LineInput'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <CreateSchoolModal/>
 */

export default summon(() => ({
  createSchool: body => ({
    creatingSchool: {
      url: '/school',
      method: 'POST',
      body
    }
  })
}))(component({
  render ({props, actions, context}) {
    const {creatingSchool = {}, createSchool} = props

    return (
      <Modal onDismiss={context.closeModal}>
        <Form onSubmit={createSchool} onSuccess={context.closeModal}>
          <ModalBody py='l' w='col_m' mx='auto'>
            <ModalHeader pb>
              Create a New School
            </ModalHeader>
            <Block mb='l'  textAlign='center'>
              Enter your school name and location below to create a new school.
            </Block>
            <Block w='250' m='0 auto 12px'>
              <LineInput autofocus name='name' placeholder='School Name' mb='l' />
              <LineInput name='location' placeholder='School Location' />
            </Block>
          </ModalBody>
          <ModalFooter bg='grey'>
            <Text fs='xxs'>
              <Text pointer underline onClick={context.closeModal}>Cancel</Text>
              <Text mx>or</Text>
            </Text>
            <Button type='submit' busy={creatingSchool.loading}>Create</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}))
