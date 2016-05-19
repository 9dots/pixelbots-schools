/**
 * Imports
 */

import ActivityRow from 'components/ActivityRow'
import summonChannels from 'lib/summon-channels'
import RowFeed from 'components/RowFeed'
import element from 'vdux/element'

/**
 * <Trash/> page
 */

function render ({props}) {
  return (
    <RowFeed {...props} item={ActivityRow} />
  )
}

/**
 * Exports
 */

export default summonChannels(
  props => `user!${props.currentUser._id}.trash`
)({
  render
})
