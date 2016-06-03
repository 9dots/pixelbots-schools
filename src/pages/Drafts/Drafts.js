/**
 * Imports
 */

import ActivityRow from 'components/ActivityRow'
import summonChannels from 'lib/summon-channels'
import EmptyState from 'components/EmptyState'
import RowFeed from 'components/RowFeed'
import {Block, Flex} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <Drafts/> Page
 */

function render ({props}) {
  return (
    <RowFeed {...props} item={ActivityRow} emptyState={<EmptyDrafts />} />
  )
}

/**
 * <EmptyDrafts/> - Drafts empty state
 */

function EmptyDrafts() {
  return (
    <EmptyState ui={Flex} column align='center center' bg='#E4E5E7' border='1px solid #D8DADD' weoIcon='draft' color='yellow' w='auto' minHeight='400px'>
      <Block fs='m' my='l'>You have no drafts.</Block>
    </EmptyState>
  )
}

/**
 * Exports
 */

export default summonChannels(props =>
  `user!${props.currentUser._id}.drafts`
)({
  render
})
