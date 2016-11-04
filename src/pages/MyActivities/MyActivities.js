/**
 * Imports
 */

import CreateActivityModal from 'modals/CreateActivityModal'
import ActivityRow from 'components/ActivityRow'
import summonChannels from 'lib/summon-channels'
import EmptyState from 'components/EmptyState'
import RowFeed from 'components/RowFeed'
import {openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <MyActivities/> Page
 */

function render ({props}) {
  const {user, currentUser} = props

  return (
    <RowFeed {...props} item={ActivityRow} itemProps={{actions: {edit: true, assign: 'Assign', pin: true}}} emptyState={<EmptyBoard currentUser={currentUser} user={user} />} />
  )
}

/**
 * <EmptyBoard/> - Board empty state
 */

function EmptyBoard({props}) {
  const {currentUser, user} = props
  const isMine = user._id === currentUser._id
  return (
    <EmptyState p='24px 12px 24px' bg='grey_light' border='1px solid #D4D4D4' icon='assignment' color='green' w='auto'>
      { isMine
          ? <Block>
              <Block fs='m' my='l'>This is a list of your pinned Activities</Block>
              <Button
                onClick={() => openModal(() => <CreateActivityModal currentUser={props.currentUser} />)}
                bgColor='blue'
                boxShadow='z2'
                color='white'
                px='35px'
                lh='3em'
                lighter
                fs='s'
                my>
                  Create My First Activity
              </Button>
              <Block lh='30px' textAlign='center' m pb='l'>
                Activities saved to boards will appear here.
              </Block>
            </Block>
          : <Block>
              <Block fs='m' my='l'>
                {user.displayName} has no public Activites</Block>
              <Block lh='30px' textAlign='center' m pb='l'>
                Saved activities saved will appear here.
              </Block>
            </Block>
      }
    </EmptyState>
  )
}

/**
 * Exports
 */

export default summonChannels(({user}) =>
  user.groups
    .filter(group => group.groupType === 'board')
    .map(board => `group!${board.id}.board`), {}, 'updatedAt'
)({
  render
})
