/**
 * Imports
 */

import summonChannels from 'lib/summon-channels'
import element from 'vdux/element'

/**
 * <ProfileStream/>
 */

function render ({props}) {
  return (
    <div>Stream!</div>
  )
}

/**
 * Exports
 */

export default summonChannels(
  props => `user!${props.currentUser._id}.activities`
)({
  render
})
