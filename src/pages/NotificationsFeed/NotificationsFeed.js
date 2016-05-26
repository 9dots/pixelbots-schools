/**
 * Imports
 */

import StreamActivity from 'components/StreamActivity'
import summonChannels from 'lib/summon-channels'
import RowFeed from 'components/RowFeed'
import element from 'vdux/element'

/**
 * <NotificationsFeed/>
 */

function render ({props}) {
  return (
    <RowFeed
      item={StreamActivity}
      w='col_xl'
      mx='auto'
      {...props}
      search={false}
       />
  )
}

/**
 * Exports
 */

export default summonChannels(
  ({currentUser}) => `user!${currentUser._id}.notifications`
)({
  render
})
