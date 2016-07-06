/**
 * Imports
 */

import Confirm from 'modals/Confirm'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block, Text} from 'vdux-ui'

/**
 * getProps
 */

function getProps (props, {currentUrl}) {
  props.isCurrent = currentUrl.indexOf(props.activity._id) !== -1
  return props
}

/**
 * <DeleteActivityModal/>
 */

function render ({props}) {
  const {activity, isCurrent} = props
  return (
    <DeleteActivity
      activityId={activity._id}
      redirect={isCurrent && '/feed'}
      message={<Block>Are you sure you want to delete <Text bold color='blue'> {activity.displayName}</Text>?</Block>} />
  )
}

const DeleteActivity = summon(({activityId}) => ({
  onAccept: () => ({
    deleting: {
      url: `/share/${activityId}`,
      method: 'DELETE',
      invalidates: ['activity_feed']
    }
  })
}))(Confirm)

/**
 * Exports
 */

export default {
  getProps,
  render
}
