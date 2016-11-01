/**
 * Imports
 */

import CreateBoardModal from 'modals/CreateBoardModal'
import EmptyState from 'components/EmptyState'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import {Block, Text} from 'vdux-ui'

/**
 * ProfileBoards empty state
 */

export default component({
  render ({props, actions}) {
    const {user, currentUser} = props
    const mine = user._id === currentUser._id

    return currentUser._id === user._id
      ? renderCurrentUserEmptyState(actions.createBoard)
      : renderOthersEmptyState(user)
  },

  events: {
    * createBoard () {
      yield context.openModal(() => <CreateBoardModal />)
    }
  }
})

/**
 * Helpers
 */

function renderOthersEmptyState (user) {
  return (
    <EmptyState color='blue' icon='dashboard'>
      <Text fw='bold'>{user.displayName} </Text>
      hasn't made any Boards yet.
    </EmptyState>
  )
}

function renderCurrentUserEmptyState (createBoard) {
  return (
    <EmptyState icon='dashboard' color='blue'>
      <Block mt mb='xl' fs='m' lighter>
        Organize Activities with Boards
      </Block>
      <Button onClick={createBoard} mx='auto' px={35} h='3em' boxShadow='z2' fs='s' bgColor='accent' lighter>Create My First Board</Button>
      <Block my='l'>
        <Text fw='bold'>Boards </Text>
        are an easy, visual way of organizing Activities for your class.
        Save homework, exams, lesson plans, and more.
      </Block>
    </EmptyState>
  )
}
