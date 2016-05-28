/**
 * Imports
 */
import summonChannels from 'lib/summon-channels'
import TileFeed from 'components/TileFeed'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <BoardActivities/>
 */

function render ({props}) {
  const {activities, more} = props
  return (
    <Block w='col_main' mt mx='auto' pb='xl'>
      <TileFeed activities={activities} more={more} />
    </Block>
  )
}

/**
 * Exports
 */

export default summonChannels(
  props => `group!${props.boardId}.board`
)({
  render
})
