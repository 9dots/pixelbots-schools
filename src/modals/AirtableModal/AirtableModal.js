/**
 * Imports
 */

import {Block, Modal, ModalBody, ModalFooter, ModalHeader, Flex, Text, Icon, Toast} from 'vdux-ui'
import BlockInput from 'components/BlockInput'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'

/**
 * <ClassCodeModal/>
 */

export default component({
  render ({props, context, actions}) {
    const {code, onSubmit} = props

    return (
      <Modal onDismiss={context.closeModal}>
        <ModalBody m='auto'>
          <Block column align='space-around center'>
            <ModalHeader>
              Export to Airtable
            </ModalHeader>
            <Block mx='auto' fs='s' fw='lighter' textAlign='center' pb lh='30px'>
              <Text> Are you sure you want to export this assignment's data to Airtable? </Text>
            </Block>
          </Block>
        </ModalBody>
        <ModalFooter bg='grey'>
          <Text fs='xxs'>
            <Text pointer underline onClick={context.closeModal}>cancel</Text>
            <Text mx>or</Text>
          </Text>
          <Button type='submit' onClick={actions.submitAndClose}>Confirm</Button>
        </ModalFooter>
      </Modal>
    )
  },

  controller: {
    * submitAndClose({props,context}){
      const {onSubmit} = props
      yield onSubmit
      yield context.closeModal
    }
  }
})
