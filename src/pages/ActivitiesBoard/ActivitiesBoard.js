/**
 * Imports
 */

import summonChannels from 'lib/summon-channels'
import RowFeed from 'components/RowFeed'

/**
 * Exports
 */

export default summonChannels(
  props => `group!${props.boardId}.board`
)(RowFeed)
