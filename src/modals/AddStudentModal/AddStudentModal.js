/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Block, Text} from 'vdux-ui'
import BlockInput from 'components/BlockInput'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'

/**
 * <Add Student Modal/>
 */

export default component({
  render ({props, actions, context}) {
    return (
    	<Modal onDismiss={context.closeModal}>
    		<ModalBody pb='l' w='col_m' mx='auto'>
    			<ModalHeader>
    				Add Students
  				</ModalHeader>
  				<BlockInput placeholder='Find students in your school…' autofocus />
    		</ModalBody>
				<ModalFooter bg='grey'>
					<Text fs='xxs'>
            <Text pointer underline onClick={context.closeModal}>cancel</Text>
            <Text mx>or</Text>
          </Text>
          <Button type='submit'>Add Student</Button>
				</ModalFooter>
    	</Modal>
    )
  }
})
