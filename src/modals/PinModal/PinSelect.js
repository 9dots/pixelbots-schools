/**
 * Imports
 */


import NewMenuItem from 'components/NewMenuItem'
import {Block, Button} from 'vdux-containers'
import WeoIcon from 'components/WeoIcon'
import validate from 'lib/validate'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * PinSelect
 */

function render({props, local, state}) {
  const {classes, createBoard, ...rest} = props
  const {value, loading} = classes

  return (
    <Block overflowY='auto' {...rest}>
      {
        !loading &&
          value.items
            .sort(cmp)
            .map(board => <BoardItem board={board} />)
      }
      <NewMenuItem key='newMenuItem' validate={validate.board} onSubmit={createBoard} type='Board' />
    </Block>
  )
}

function BoardItem({props}) {
  const {board} = props
  return (
    <Block
      hoverProps={{highlight: 0.03}}
      align='start center'
      bgColor='white'
      pointer
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
 * Helpers
 */

function cmp (a, b) {
  return a.displayName.toUpperCase() > b.displayName.toUpperCase() ? 1 : -1
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
  })
}))({
  render
})