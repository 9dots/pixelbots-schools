/**
 * Imports
 */

import CreateActivityModal from 'modals/CreateActivityModal'
import EmptyBoardActivities from './EmptyBoardActivities'
import summonChannels from 'lib/summon-channels'
import TileFeed from 'components/TileFeed'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import {Block, Flex} from 'vdux-ui'

/**
 * <BoardActivities/>
 */

export default summonChannels(
  props => `group!${props.boardId}.board`
)(component({
  render ({props}) {
    const {activities, more, currentUser, board} = props
    const isOwner = currentUser._id === board.owners[0].id

    return (
      <Block w='col_main' mt mx='auto' pb='xl'>
        <TileFeed activities={activities} activityProps={{showFork: true}} currentUser={currentUser} more={more} emptyState={<EmptyBoardActivities currentUser={currentUser} isOwner={isOwner} />} skip={250}>
          {
            isOwner &&
            <Flex bgColor='rgba(0,0,0,0.025)' mx={6} my={8} column align='center center' border='1px dashed #b1b7bc' w={230} h={250}>
              <Block fs='s' fw='lighter' mb>New Activity</Block>
              <Button onClick={actions.createActivity}
                hoverProps={{highlight: 0.02, boxShadow: 'z3'}}
                focusProps={{highlight: 0.02}}
                transition='box-shadow .15s'
                boxShadow='z2'
                circle='42'
                bgColor='white'
                color='text'
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
  },

  events: {
    * createActivity ({props, context}) {
      yield context.openModal(() => <CreateActivityModal currentUser={props.currentUser} />)
    }
  }
}))
