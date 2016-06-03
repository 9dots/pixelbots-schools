/**
 * Imports
 */

import EmptyProfileStream from './EmptyProfileStream'
import StreamActivity from 'components/StreamActivity'
import summonChannels from 'lib/summon-channels'
import RowFeed from 'components/RowFeed'
import element from 'vdux/element'

/**
 * <ProfileStream/>
 */

function render ({props}) {
  const {currentUser, user} = props
  return (
    <RowFeed {...props} search={false} item={StreamActivity} wide emptyState={<EmptyProfileStream me={currentUser} user={user} />} />
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
