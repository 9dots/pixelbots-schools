/**
 * Imports
 */


import NewMenuItem from 'components/NewMenuItem'
import {Block, Button} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {closeModal} from 'reducer/modal'
import WeoIcon from 'components/WeoIcon'
import validate from 'lib/validate'
import element from 'vdux/element'
import {fork} from '@flox/fork'
import map from '@f/map'

/**
 * PinSelect
 */

function render ({props, local, state}) {
  const {boards, createBoard, onSelect, busy, ...rest} = props

  return (
    <Block overflowY='auto' {...rest}>
      {
        map(board => <BoardItem busy={busy} board={board} onClick={() => selectBoard(board)} selected={state.selected === board._id} />, boards)
      }
      <NewMenuItem key='newMenuItem' validate={validate.board} onSubmit={handleSubmit} loading={busy} type='Board' />
    </Block>
  )

  function * selectBoard(board) {
    yield local(select, board._id)()
    yield onSelect(board)
  }

  function * handleSubmit (board) {
    const newBoard = yield createBoard(board)
    yield fork(onSelect(newBoard))
  }
}

function BoardItem ({props}) {
  const {onClick, board, busy, selected} = props
  return (
    <Block
      hoverProps={{highlight: 0.03}}
      align='start center'
      bgColor='white'
      pointer={!busy}
      onClick={!busy && onClick}
      p>
      <Button
        hoverProps={{highlight: 0.01}}
        focusProps={{highlight: 0.01}}
        border='1px solid blue'
        bgColor='white'
        color='blue'
        darkSpinner
        busy={selected && busy}
        disabled={busy}
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
 * Actions
 */

const select = createAction('<PinSelect/>: select')

/**
 * Reducer
 */

const reducer = handleActions({
  [select]: (state, selected) => ({...state, selected})
})

/**
 * Exports
 */

export default {
  render,
  reducer
}
