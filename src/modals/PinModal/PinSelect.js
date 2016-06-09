/**
 * Imports
 */


import NewMenuItem from 'components/NewMenuItem'
import {Block, Button} from 'vdux-containers'
import {closeModal} from 'reducer/modal'
import WeoIcon from 'components/WeoIcon'
import validate from 'lib/validate'
import element from 'vdux/element'
import summon from 'vdux-summon'
import map from '@f/map'

/**
 * PinSelect
 */

function render({props, local, state}) {
  const {classes, createBoard, pin, activity, ...rest} = props
  const {value, loading} = classes

  return (
    <Block overflowY='auto' {...rest}>
      {
        !loading &&
            map(board => <BoardItem board={board} onClick={() => pinToBoard(board._id, activity._id)} />, value.items)
      }
      <NewMenuItem key='newMenuItem' validate={validate.board} onSubmit={handleSubmit} type='Board' />
    </Block>
  )

  function * handleSubmit (board) {
    const newBoard = yield createBoard(board)
    yield pinToBoard()
  }

  function * pinToBoard (boardId, activityId) {
    yield pin(boardId, activityId)
    yield closeModal()
  }
}

function BoardItem({props}) {
  const {onClick, board} = props
  return (
    <Block
      hoverProps={{highlight: 0.03}}
      align='start center'
      bgColor='white'
      pointer
      onClick={onClick}
      p>
      <Button
        hoverProps={{highlight: 0.01}}
        focusProps={{highlight: 0.01}}
        border='1px solid blue'
        bgColor='white'
        color='blue'
        h='32px'
        w='38px'
        p='0'
        mr>
        <WeoIcon fs='s' name='pin' />
      </Button>
        {board.displayName}
    </Block>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  classes: '/user/boards',
  createBoard: body => ({
    newBoard: {
      url: '/board/',
      method: 'POST',
      invalidates: ['/user/boards', '/user'],
      body
    }
  }),
  pin: (boardId, activityId) => ({
    pinToBoard: {
      url: `/share/${activityId}/pin/`,
      method: 'PUT',
      body: {
        to: [boardId]
      }
    }
  })
}))({
  render
})