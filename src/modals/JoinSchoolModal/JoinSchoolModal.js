/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Block, Text} from 'vdux-ui'
import CreateSchoolModal from 'modals/CreateSchoolModal'
import JoinSchool from 'components/JoinSchool'
import LineInput from 'components/LineInput'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import Form from 'vdux-form'

/**
 * <JoinSchoolModal/>
 */

export default component({
  render ({props, actions, context}) {
    const {joinSchool, joiningSchool = {}} = props

    return (
      <Modal onDismiss={context.closeModal}>
        <ModalBody pb='l' w='col_m' mx='auto'>
          <ModalHeader>
            Join a School
          </ModalHeader>
          <JoinSchool mt='l' mb />
          <Text 
            onClick={context.openModal(() => <CreateSchoolModal />)}
            color='grey_medium'
            textAlign='center'
            display='block'
            underline 
            fs='xxs'
            pointer
            mb='l'>
            Can't find your school? Click to create it!
          </Text>
        </ModalBody>
        <ModalFooter bg='grey'>
          <Text fs='xxs'>
            <Text pointer underline onClick={context.closeModal}>Cancel</Text>
            <Text mx>or</Text>
          </Text>
          <Button type='submit' busy={joiningSchool.loading}>Join</Button>
        </ModalFooter>
      </Modal>
    )
  }
})
