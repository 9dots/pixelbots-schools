/**
 * Imports
 */

import CreateActivityModal from 'modals/CreateActivityModal'
import EmptyBoardActivities from './EmptyBoardActivities'
import summonChannels from 'lib/summon-channels'
import TileFeed from 'components/TileFeed'
import {openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import {Block, Flex} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <BoardActivities/>
 */

function render ({props}) {
  const {activities, more, currentUser, board} = props
  const isOwner = currentUser._id === board.owners[0].id
  return (
    <Block w='col_main' mt mx='auto' pb='xl'>
      <TileFeed activities={activities} currentUser={currentUser} more={more} emptyState={<EmptyBoardActivities currentUser={currentUser} isOwner={isOwner} />}>
        {
          isOwner &&
          <Flex bgColor='rgba(0,0,0,0.025)' mx={6} my={8} column align='center center' border='1px dashed #b1b7bc' w={230} h={250}>
            <Block fs='s' fw='lighter' mb>New Activity</Block>
            <Button onClick={() => openModal(() => <CreateActivityModal currentUser={currentUser} />)}
              hoverProps={{highlight: 0.02, boxShadow: 'z3'}}
              focusProps={{highlight: 0.02}}
              transition='box-shadow .15s'
              boxShadow='z2'
              circle='42'
              bgColor='white'
              color='midgray'
              icon='add'
              fw='200'
              fs='m'
              p='0'
              mt/>
          </Flex>
        }
      </TileFeed>
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
