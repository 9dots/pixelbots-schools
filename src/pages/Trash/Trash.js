/**
 * Imports
 */

import summonChannels from 'lib/summon-channels'
import RowFeed from 'components/RowFeed'

/**
 * Exports
 */

export default summonChannels(
  props => `user!${props.currentUser._id}.trash`
)(RowFeed)
