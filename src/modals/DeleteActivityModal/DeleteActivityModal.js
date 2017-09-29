/**
 * Imports
 */

import {component, element} from 'vdux'
import Confirm from 'modals/Confirm'
import {Block, Text} from 'vdux-ui'

/**
 * <DeleteActivityModal/>
 */

export default component({
  render ({props, actions}) {
    const {activity, deleting} = props

    return (
      <Confirm
        accepting={deleting}
        message={<Block>Are you sure you want to delete <Text bold color='blue'> {activity.displayName}</Text>?</Block>}
        onAccept={actions.accept} />
    )
  },

  controller: {
    * accept ({props}) {
      const {onDelete} = props
      if (onDelete) yield onDelete()
    }
  }
})
