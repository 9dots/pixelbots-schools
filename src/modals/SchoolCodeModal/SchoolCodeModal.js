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
          <Block column align='space-around center'>
            <ModalHeader>
              School Link
            </ModalHeader>
            <BlockInput my autofocus value={`https://www.pixelbots.io/schools/${school.key}`} readonly onFocus={{selectTarget: true}} inputProps={{bgColor: '#FAFAFA', color: '#888'}} />
            <Block p lh='1.5em' italic textAlign='center'>
            	Bookmark this link on your students' computers to make it easier for them to log in to PixelBots!
            </Block>
          </Block>
        </ModalBody>
        <ModalFooter bg='grey' align='end center'>
          <Button type='submit' onClick={context.closeModal}>Ok</Button>
        </ModalFooter>
      </Modal>
    )
  }
})