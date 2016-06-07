/**
 * Imports
 */

import CreateBoardModal from 'modals/CreateBoardModal'
import {Block, Text} from 'vdux-ui'
import EmptyState from 'components/EmptyState'
import {openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'

/**
 * ProfileBoards empty state
 */

function render ({props}) {
  const {user, currentUser} = props
  const mine = user._id === currentUser._id

  return currentUser._id === user._id
    ? renderCurrentUserEmptyState()
    : renderOthersEmptyState(user)
}

function renderOthersEmptyState (user) {
  return (
    <EmptyState color='blue' icon='dashboard'>
      <Text fw='bold'>{user.displayName} </Text>
      hasn't made any Boards yet.
    </EmptyState>
  )
}

function renderCurrentUserEmptyState () {
  return (
    <EmptyState icon='dashboard' color='green'>
      <Block mt mb='xl' fs='m' lighter>
        Organize Activities with Boards
      </Block>
      <Button onClick={() => openModal(() => <CreateBoardModal />)} mx='auto' px={35} h='3em' boxShadow='z2' fs='s' bgColor='accent' lighter>Create My First Board</Button>
      <Block my='l'>
        <Text fw='bold'>Boards </Text>
        are an easy, visual way of organizing Activities for your class.
        Save homework, exams, lesson plans, and more.
      </Block>
    </EmptyState>
  )
}

/**
 * Exports
 */

export default {
  render
}
