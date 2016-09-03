/**
 * Imports
 */

import Confirm from 'modals/Confirm'
import {Block, Text} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'
import noop from '@f/noop'

/**
 * <DiscardDraftModal/>
 */

function render ({props}) {
  const {activity, deleteActivity, onAccept = noop} = props
  return (
    <Confirm
      header='Discard Draft?'
      message='You will lose your Activity if you exit without saving. Are you sure you want to delete your draft?'
      onAccept={accept} />
  )

  function * accept() {
    yield deleteActivity()
    yield onAccept()
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
  render
})
