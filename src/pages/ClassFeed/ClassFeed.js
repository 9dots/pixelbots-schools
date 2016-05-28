/**
 * Imports
 */

import ClassActivityRow from 'components/ClassActivityRow'
import summonChannels from 'lib/summon-channels'
import RowFeed from 'components/RowFeed'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <ClassFeed/> Page
 */

function render ({props}) {
  return (
    <RowFeed {...props} item={ClassActivityRow} />
  )
}

/**
 * Exports
 */

export default summonChannels(({group}) => `group!${group._id}.board`)({
  render
})
