/**
 * Imports
 */

import ClassActivityRow from 'components/ClassActivityRow'
import summonChannels from 'lib/summon-channels'
import EmptyClassFeed from './EmptyClassFeed'
import RowFeed from 'components/RowFeed'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <ClassFeed/> Page
 */

function render ({props}) {
  const {activities} = props
  const {loaded, value} = activities
  return (
    <Block>
      {
        loaded && value.items.length
          ? <RowFeed {...props} item={ClassActivityRow} />
          : <EmptyClassFeed />
      }
    </Block>
  )
}

/**
 * Exports
 */

export default summonChannels(({group}) => `group!${group._id}.board`)({
  render
})
