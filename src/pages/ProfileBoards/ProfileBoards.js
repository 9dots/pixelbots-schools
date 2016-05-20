/**
 * Imports
 */

import CreateBoardModal from 'modals/CreateBoardModal'
import BoardTile from 'components/BoardTile'
import {Flex, Block, Grid, Icon} from 'vdux-ui'
import {openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import EmptyState from './EmptyState'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <ProfileBoards/>
 */

function render ({props}) {
  const {user, currentUser, boards} = props
  const {value, loading} = boards

  return (
    <Block hide={loading} w='calc(100% + 12px)'>
      {
        value && value.items.length
          ? renderGrid(value.items, currentUser, user)
          : <EmptyState user={user} currentUser={currentUser} />
      }
    </Block>
  )
}

function renderGrid (boards, currentUser, user) {
  const btnSize = '42px'

  return (
    <Grid alignRow='start'>
      {
        currentUser._id === user._id &&
        <Flex bgColor='rgba(0,0,0,0.025)' mx={6} my={8} column align='center center' border='1px dashed #b1b7bc' w={230} h={250}>
          <Block fs='s' fw='lighter' mb>Create New Board</Block>
          <Button onClick={() => openModal(() => <CreateBoardModal />)} bgColor='white' boxShadow='card' fs='m' circle={btnSize} p='0' mt hoverProps={{highlight: 0.02}} icon='add' fw='200' color='midgray'/>
        </Flex>
      }
      {
        boards.map(board => <BoardTile board={board} currentUser={currentUser} />)
      }
    </Grid>
  )
}

/**
 * Exports
 */

export default summon(({user}) => ({
  boards: `/user/${user._id}/boards`,
}))({
  render
})
