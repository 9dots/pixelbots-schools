/**
 * Imports
 */

import summonChannels from 'lib/summon-channels'
import ActivityRow from 'components/ActivityRow'
import RowFeed from 'components/RowFeed'
import {Flex, Icon, Text} from 'vdux-ui'
import {Button} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <ActivitiesBoard/> Page
 */

function render ({props}) {
  return (
    <RowFeed {...props} emptyState={EmptyBoard} item={ActivityRow} />
  )
}

/**
 * <EmptyBoard/> - Board empty state
 */

function EmptyBoard() {
  return (
    <Flex column align='center center' p='12px 12px 24px' fw='200' bg='#E4E5E7' border='1px solid #D8DADD'>
      <Icon name='dashboard' color='green' fs='120px' p m/>
      <Text fs='m' mb='l'>This is your Board</Text>
      <Button bgColor='green' color='white' my fs='s' fw='lighter' lh='3em' px='35px' boxShadow='card'>Add My First Activity</Button>
      <Text fs='s' lh='30px' textAlign='center' m w='66%' pt pb='l'>
        <Text fw='bold'>Boards </Text>
        are collections of Activities. Save Activities to Boards to keep them organized and easy to find.
      </Text>
    </Flex>
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
