/**
 * Imports
 */

import {Modal, Block, Button} from 'vdux-ui'
import {closeModal} from 'reducer/modal'
import element from 'vdux/element'

/**
 * <TestModal/>
 */

function render ({props}) {
  return (
    <Modal onDismiss={closeModal}>
      Test Modal
      <Button onClick={closeModal}>Close</Button>
    </Modal>
  )
}

function onRemove ({props}) {
  return props.onDismiss && props.onDismiss()
}

/**
 * Exports
 */

export default {
  render,
  onRemove
}
