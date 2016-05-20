/**
 * Imports
 */

import CreateBoardModal from 'modals/CreateBoardModal'
import {Block, Text, Flex, Icon} from 'vdux-ui'
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
    <Flex column p mt mx='auto' align='center center'>
      <Icon fs='xxl' color='green_medium' name='dashboard' />
      <Text fs='s'>
        <Text fw='bold'>{user.displayName} </Text>
        hasn't made any Boards yet.
      </Text>
    </Flex>
  )
}

function renderCurrentUserEmptyState () {
  return (
    <Block p>
      <Icon display='block' textAlign='center' fs='xxl' color='blue_medium' name='dashboard' />
      <Block mx='auto' w='col_med' p>
        <Block mb pb fs='m' fw='lighter' textAlign='center'>Organize Activities with Boards</Block>
        <Button onClick={() => openModal(() => <CreateBoardModal />)} display='block' mx='auto' px={35} h='3em' boxShadow='card' fs='s' bgColor='accent' fw='lighter'>Create My First Board</Button>
        <Block mt py fs='s' lh='20px' textAlign='center'>
          <Text fw='lighter'>
            <Text fw='bold'>Boards </Text>
            are an easy, visual way of organizing Activities for your class.
            Save homework, exams, lesson plans, and more.
          </Text>
        </Block>
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
