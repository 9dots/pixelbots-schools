/**
 * Imports
 */

import StreamActivity from 'components/StreamActivity'
import summonChannels from 'lib/summon-channels'
import RowFeed from 'components/RowFeed'
import element from 'vdux/element'

/**
 * <ProfileStream/>
 */

function render ({props}) {
  return (
    <RowFeed {...props} search={false} item={StreamActivity} wide />
  )
}

/**
 * Exports
 */

export default summonChannels(
  ({user}) => `user!${user._id}.activities`
)({
  render
})
