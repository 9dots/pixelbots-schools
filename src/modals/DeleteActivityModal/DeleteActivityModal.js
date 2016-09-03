/**
 * Imports
 */

import {back, setUrl} from 'redux-effects-location'
import Confirm from 'modals/Confirm'
import {Block, Text} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'

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
  const {activity, deleteActivity, onDelete} = props

  return (
    <Confirm
      message={<Block>Are you sure you want to delete <Text bold color='blue'> {activity.displayName}</Text>?</Block>}
      onAccept={accept} />
  )

  function * accept() {
    yield deleteActivity()
    if (onDelete) yield onDelete()
  }
}


/**
 * Exports
 */

export default summon(({activity}) => ({
  deleteActivity: () => ({
    deleting: {
      url: `/share/${activity._id}`,
      method: 'DELETE',
      invalidates: ['activity_feed']
    }
  })
}))({
  getProps,
  render
})
