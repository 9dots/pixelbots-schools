/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Block, Text, Flex} from 'vdux-ui'
import ActivityTileModaled from 'components/ActivityTileModaled'
import {Button, Input} from 'vdux-containers'
import {closeModal} from 'reducer/modal'
import PinSelect from './PinSelect'
import element from 'vdux/element'

/**
 * <PinModal/>
 */

function render ({props}) {
  const {activity} = props

  return (
    <Modal onDismiss={closeModal} w='620' bgColor='grey_light'>
      <Flex>
        <Block flex align='center center' py px='l'>
          <ActivityTileModaled activity={activity} />
        </Block>
        <Flex column bg='white' flex boxShadow='-1px 0 1px 0 rgba(0,0,0,0.1)' relative minHeight='400px'>
          <ModalHeader fs='s' h='56px' lh='56px' p='0' bg='off_white' borderBottom='1px solid grey_light'>
            Select a Board to Pin to:
          </ModalHeader>
          <PinSelect absolute h='calc(100% - 56px)' wide />
        </Flex>
      </Flex>
      <ModalFooter m='0'>
        <Text fs='xxs' py='s'>
          <Text pointer underline onClick={closeModal}>cancel</Text>
        </Text>
      </ModalFooter>
    </Modal>
  )
}

/**
 * Exports
 */

export default {
  render
}
