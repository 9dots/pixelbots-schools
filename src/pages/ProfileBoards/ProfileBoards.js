/**
 * Imports
 */

import CreateBoardModal from 'modals/CreateBoardModal'
import BoardTile from 'components/BoardTile'
import {Flex, Block, Grid} from 'vdux-ui'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import EmptyState from './EmptyState'
import summon from 'vdux-summon'

/**
 * <ProfileBoards/>
 */

export default summon(({user, currentUser}) => ({
  boards: user._id === currentUser._id
    ? '/user/boards'
    : `/user/${user._id}/boards`
}))(component({
  render ({props, actions}) {
    const {user, currentUser, boards} = props
    const {value, loaded} = boards

    return (
      <Block hide={!loaded} w='calc(100% + 12px)'>
        {
          loaded && value.items.length
            ? renderGrid(value.items, currentUser, user, actions.createBoard)
            : <EmptyState user={user} currentUser={currentUser} />
        }
      </Block>
    )
  },

  events: {
    * createBoard ({context}) {
      yield context.openModal(() => <CreateBoardModal />)
    }
  }
}))

/**
 * Helpers
 */

function renderGrid (boards, currentUser, user, createBoard) {
  return (
    <Grid alignRow='start'>
      {
        currentUser._id === user._id &&
        <Flex bgColor='rgba(0,0,0,0.025)' mx={6} my={8} column align='center center' border='1px dashed #b1b7bc' w={230} h={250}>
          <Block fs='s' fw='lighter' mb>Create New Board</Block>
          <Button onClick={createBoard}
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
            mt />
        </Flex>
      }
      {
        boards.map(board => <BoardTile hideMeta board={board} currentUser={currentUser} />)
      }
    </Grid>
  )
}
