/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Block} from 'vdux-ui'
import BlockInput from 'components/BlockInput'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'

/**
 * <SchoolCodeModal/>
 */

export default component({
  render ({props, context, actions}) {
    const {school} = props

    return (
      <Modal onDismiss={context.closeModal}>
        <ModalBody>
          <Block column align='space-around center' py='l'>
            
            <Block fs='s' lighter my uppercase color='blue'>Teacher Join</Block>
            <Block lh='1.5em' italic textAlign='center'>
            	Teachers can join your school by entering this code:
            </Block>
            <BlockInput my value={school.code} w={120} readonly onClick={{selectTarget: true}} inputProps={{bgColor: '#FAFAFA', color: '#888', textAlign: 'center', py: 10}} />
            
            <Block borderBottom='1px solid divider' wide my />

            <Block fs='s' lighter uppercase my color='blue'>Student Link</Block>
            <Block w='120%' lh='1.5em' italic textAlign='center'>
            	Bookmark this link on your students' computers for easier PixelBots login!
            </Block>
            <BlockInput my value={`https://www.pixelbots.io/schools/${school.key}`} readonly onClick={{selectTarget: true}} inputProps={{bgColor: '#FAFAFA', color: '#888', textAlign: 'center', py: 10}} />

          </Block>
        </ModalBody>
        <ModalFooter bg='grey' align='end center'>
          <Button type='submit' onClick={context.closeModal}>Ok</Button>
        </ModalFooter>
      </Modal>
    )
  }
})