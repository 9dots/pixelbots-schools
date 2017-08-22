/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Block} from 'vdux-ui'
import BlockInput from 'components/BlockInput'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'

/**
 * <ClassCodeModal/>
 */

export default component({
  render ({props, context}) {
    const {code} = props

    return (
      <Modal onDismiss={context.closeModal}>
        <ModalBody m='auto'>
          <Block column align='space-around center'>
            <ModalHeader>
              Class Code
            </ModalHeader>
            <Block mx='auto' fs='s' fw='lighter' textAlign='center' pb lh='30px'>
              To join this class, students can sign in and click the Join Class button and enter this code:&nbsp;
              <BlockInput my autofocus value={code} readonly onFocus={{selectTarget: true}} mx='auto' w='50%' inputProps={{bgColor: '#FAFAFA', color: 'blue', textAlign: 'center', fontFamily: 'monospace', py: 's', fs: '18px'}} />
            </Block>
          </Block>
        </ModalBody>
        <ModalFooter bg='grey'>
          <Button onClick={context.closeModal}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
})
