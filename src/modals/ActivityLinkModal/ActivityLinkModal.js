/**
 * Imports
 */

import {Modal, ModalHeader, Block, Text} from 'vdux-ui'
import BlockInput from 'components/BlockInput'
import {closeModal} from 'reducer/modal'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <ActivityLinkModal/>
 */

function render ({props}) {
  const {activity, group, classId} = props
  const {value, loading} = group

  if(loading) return <span/>

  const url = `${window.location.origin}/activity/${activity._id}/${value._id}`

  return (
    <Modal onDismiss={closeModal} pb='l'>
      <ModalHeader w='col_s' m='auto'>
        Activity Link
      </ModalHeader>
      <Block w='col_s' mx='auto' mb='l'>
        <Block mb='l' fs='s' color='grey_medium' textAlign='center'>
          Copy the link below to share this activity with the students in your
          <Text color='blue' bold> {value.displayName} </Text>
          class.
        </Block>
        <BlockInput autofocus value={url}/>
      </Block>
    </Modal>
  )
}

/**
 * Exports
 */

export default summon(({classId}) => ({
  group: `/group/${classId}`
}))({
  render
})
