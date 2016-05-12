/**
 * Imports
 */

import RowFeed from 'components/RowFeed'
import summonChannels from 'lib/summon-channels'

/**
 * Exports
 */

export default summonChannels(props =>
  props.currentUser.groups
    .filter(group => group.groupType === 'board')
    .map(board => `group!${board.id}.board`)
)(RowFeed)
