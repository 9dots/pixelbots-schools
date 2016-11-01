/**
 * Imports
 */

import ActivityRow from 'components/ActivityRow'
import summonChannels from 'lib/summon-channels'
import EmptyState from 'components/EmptyState'
import RowFeed from 'components/RowFeed'
import {component, element} from 'vdux'
import {Block, Flex} from 'vdux-ui'

/**
 * <Drafts/> Page
 */

export default summonChannels(props =>
  `user!${props.currentUser._id}.drafts`
)(component({
  render ({props}) {
    return (
      <RowFeed {...props} item={ActivityRow} emptyState={<EmptyDrafts />} itemProps={{options: {edit: true, archive: true}}}/>
    )
  }
}))

/**
 * <EmptyDrafts/> - Drafts empty state
 */

function EmptyDrafts () {
  return (
    <EmptyState ui={Flex} column align='center center' bg='#E4E5E7' border='1px solid #D8DADD' weoIcon='draft' color='yellow' w='auto' minHeight='400px'>
      <Block fs='m' my='l'>You have no drafts.</Block>
    </EmptyState>
  )
}
