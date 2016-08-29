/**
 * Imports
 */

import {Modal, ModalHeader, ModalBody, ModalFooter, Block, Text, Icon} from 'vdux-ui'
import {Button, Toggle, Tooltip} from 'vdux-containers'
import BlockInput from 'components/BlockInput'
import {closeModal} from 'reducer/modal'
import element from 'vdux/element'

/**
 * <RedoModal/>
 */

function render ({props}) {
  const {onAccept = () => {}} = props

  return (
    <Modal onDismiss={closeModal}>
      <ModalHeader w='col_s' m='auto'>
        Redo
      </ModalHeader>
      <ModalBody pb={40} pt={12} align='space-between center'>
        <Toggle fs='s' lighter label='Mark incorrect questions for students.' flex />
        <Tooltip message='This toggles whether or not you want students to be able to see which questions they got right or wrong when they redo their Activity.' cursor='default' immediate tooltipProps={{whiteSpace: 'normal', textAlign: 'center', lh: '16px'}}>
          <Icon name='info' fs='s' />
        </Tooltip>
      </ModalBody>
      <ModalFooter m='0'>
        <Text fs='xxs'>
          <Text pointer underline onClick={closeModal}>cancel</Text>
          <Text mx>or</Text>
        </Text>
        <Button type='submit' onClick={submit}>Redo</Button>
      </ModalFooter>
    </Modal>

  )
  function * submit() {
    yield onAccept()
    yield closeModal()
  }
}

/**
 * Exports
 */

export default {
  render
}