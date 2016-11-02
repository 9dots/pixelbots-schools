/**
 * Imports
 */

import CreateActivityModal from 'modals/CreateActivityModal'
import ActivityRow from 'components/ActivityRow'
import summonChannels from 'lib/summon-channels'
import EmptyState from 'components/EmptyState'
import RowFeed from 'components/RowFeed'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import {Block} from 'vdux-ui'

/**
 * <MyActivities/> Page
 */

export default summonChannels(({currentUser}) =>
  currentUser.groups
    .filter(group => group.groupType === 'board')
    .map(board => `group!${board.id}.board`), {}, 'updatedAt'
)(component({
  render ({props}) {
    return (
      <RowFeed {...props} item={ActivityRow} itemProps={{options: {edit: true, assign: 'Assign', pin: true}}} emptyState={<EmptyBoard currentUser={props.currentUser} />} />
    )
  }
}))

/**
 * <EmptyBoard/> - Board empty state
 */

const EmptyBoard = component({
  render ({props, actions}) {
    return (
      <EmptyState p='24px 12px 24px' bg='#E4E5E7' border='1px solid #D8DADD' icon='assignment' color='green' w='auto'>
        <Block fs='m' my='l'>This is a list of your pinned Activities</Block>
        <Button
          onClick={actions.createActivity}
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
      </EmptyState>
    )
  },

  events: {
    * createActivity ({props, context}) {
      yield context.openModal(() => <CreateActivityModal currentUser={props.currentUser} />)
    }
  }
})
