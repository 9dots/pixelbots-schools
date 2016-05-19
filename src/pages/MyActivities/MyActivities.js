/**
 * Imports
 */

import ActivityRow from 'components/ActivityRow'
import summonChannels from 'lib/summon-channels'
import RowFeed from 'components/RowFeed'
import element from 'vdux/element'

/**
 * <MyActivities/> Page
 */

function render ({props}) {
  return (
    <RowFeed {...props} item={ActivityRow} />
  )
}

/**
 * Exports
 */

export default summonChannels(({currentUser}) =>
  currentUser.groups
    .filter(group => group.groupType === 'board')
    .map(board => `group!${board.id}.board`)
)({
  render
})
