/**
 * Imports
 */

import CreateActivityModal from 'modals/CreateActivityModal'
import EmptyState from 'components/EmptyState'
import {openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import {Block, Text} from 'vdux-ui'
import element from 'vdux/element'

/**
 * EmptyProfileLikes
 */

function render({props}) {
  const {isOwner, currentUser} = props
  return (
    <EmptyState icon='dashboard' color='green'>
      {
        isOwner
          ? <Block>
              <Block fs='m'>This is your Board</Block>
              <Button
                onClick={() => openModal(() => <CreateActivityModal currentUser={currentUser} />)}
                bgColor='green'
                boxShadow='z2'
                color='white'
                px='35px'
                lighter
                h='3em'
                fs='s'
                my='l'>
                Add My First Activity
              </Button>
              <Block>
                <Text bold>Boards </Text> are collections of Activities. Save Activities to Boards to keep them organized and easy to find.
              </Block>
            </Block>
          : <Block>
              This Board has no Activities yet.
            </Block>
      }
    </EmptyState>
  )
}

/**
 * Exports
 */

export default {
  render
}
