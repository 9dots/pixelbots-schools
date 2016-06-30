/**
 * Imports
 */


import NewMenuItem from 'components/NewMenuItem'
import {Block, Button} from 'vdux-containers'
import {closeModal} from 'reducer/modal'
import WeoIcon from 'components/WeoIcon'
import validate from 'lib/validate'
import element from 'vdux/element'
import map from '@f/map'

/**
 * PinSelect
 */

function render ({props, local, state}) {
  const {boards, createBoard, onSelect, ...rest} = props

  return (
    <Block overflowY='auto' {...rest}>
      {
        map(board => <BoardItem board={board} onClick={() => onSelect(board)} />, boards)
      }
      <NewMenuItem key='newMenuItem' validate={validate.board} onSubmit={handleSubmit} type='Board' />
    </Block>
  )

  function * handleSubmit (board) {
    const newBoard = yield createBoard(board)
    yield onSelect(newBoard)
  }
}

function BoardItem ({props}) {
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

export default {
  render
}
