/**
 * Imports
 */

import CreateActivityModal from 'modals/CreateActivityModal'
import ActivityRow from 'components/ActivityRow'
import summonChannels from 'lib/summon-channels'
import EmptyState from 'components/EmptyState'
import RowFeed from 'components/RowFeed'
import {openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import {Text, Block} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <ActivitiesBoard/> Page
 */

function render ({props}) {
  const {currentUser} = props
  return (
    <RowFeed {...props} emptyState={<EmptyBoard currentUser={currentUser} />} item={ActivityRow} itemProps={{showActions: true}} />
  )
}

/**
 * <EmptyBoard/> - Board empty state
 */

function EmptyBoard({props}) {
  const {currentUser} = props
  return (
    <EmptyState p='24px 12px 24px' bg='#E4E5E7' border='1px solid #D8DADD' icon='dashboard' color='green' w='auto'>
      <Block fs='m' my='l'>This is your Board</Block>
      <Button
        onClick={() => openModal(() => <CreateActivityModal currentUser={currentUser} />)}
        bgColor='blue'
        boxShadow='z2'
        color='white'
        px='35px'
        lh='3em'
        lighter
        fs='s'
        my>
          Add My First Activity
      </Button>
      <Block lh='30px' textAlign='center' m pt pb='l'>
        <Text fw='bold'>Boards </Text>
        are collections of Activities. Save Activities to Boards to keep them organized and easy to find.
      </Block>
    </EmptyState>
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
