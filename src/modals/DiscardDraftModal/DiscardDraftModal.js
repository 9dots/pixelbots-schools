/**
 * Imports
 */

import Confirm from 'modals/Confirm'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block, Text} from 'vdux-ui'

/**
 * <DiscardDraftModal/>
 */

function render ({props}) {
  const {activity} = props
  return (
    <DeleteActivity
      activityId={activity._id}
      header='Discard Draft?'
      redirect='/feed'
      message='You will lose your Activity if you exit without saving. Are you sure you want to delete your draft?' />
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
  render
}
