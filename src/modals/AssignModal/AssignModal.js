/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Block, Text, Flex} from 'vdux-ui'
import ActivityTile from 'components/ActivityTile'
import {Button, Input} from 'vdux-containers'
import {closeModal} from 'reducer/modal'
import ClassSelect from './ClassSelect'
import element from 'vdux/element'

/**
 * <AssignModal/>
 */

function render ({props}) {
  const {activity} = props

  return (
    <Modal onDismiss={closeModal} w='620' bgColor='grey_light'>
      <Flex>
        <Block flex align='center center' py px='l'>
          <ActivityTile activity={activity} />
        </Block>
        <Flex column bg='white' flex boxShadow='-1px 0 1px 0 rgba(0,0,0,0.1)' relative minHeight='400px'>
          <ModalHeader fs='s' h='56px' lh='56px' p='0' bg='off_white' borderBottom='1px solid grey_light'>
            Select Classes to Assign to:
          </ModalHeader>
          <ClassSelect absolute h='calc(100% - 56px)' wide />
        </Flex>
      </Flex>
      <ModalFooter m='0'>
        <Text fs='xxs'>
          <Text pointer underline onClick={closeModal}>cancel</Text>
          <Text mx>or</Text>
        </Text>
        <Button type='submit'>Assign</Button>
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
