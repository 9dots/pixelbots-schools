/**
 * Imports
 */

import ActivityRowStudent from 'components/ActivityRowStudent'
import JoinClassModal from 'modals/JoinClassModal'
import summonChannels from 'lib/summon-channels'
import EmptyState from 'components/EmptyState'
import PageTitle from 'components/PageTitle'
import RowFeed from 'components/RowFeed'
import {openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import {Block, Card} from 'vdux-ui'

/**
 * <AllClasses/>
 */

function render ({props}) {
  const {currentUser} = props
  const {userType, preferences = {}} = currentUser

  if (!preferences.group_joined) return <Join />

  return (
    <Block maxWidth='714px' mx='auto' relative>
      <PageTitle title='Weo' />
      <Card p fs='s' lighter mb>
        All Classes
      </Card>
      <RowFeed {...props} item={ActivityRowStudent} emptyState={<Empty />} />
    </Block>
  )
}

function Join () {
  return (
    <EmptyState icon='school' color='blue' w='col_xl' mt mx='auto' bgColor='rgba(black, .05)' pb='50'>
      You're not in any classes yet!
      <Block fs='xs' my>
        Click the button below to join your first class:
      </Block>
      <Button
        onClick={() => openModal(() => <JoinClassModal />)}
        bgColor='green'
        boxShadow='z1'
        border='1px solid rgba(black, .1)'
        p='16px 40px'
        lighter
        fs='s'
        mt>
        Join Class
      </Button>
    </EmptyState>
  )
}

function Empty () {
  return (
    <EmptyState icon='assignment' color='green' w='col_xl' mt mx='auto'>
      Nothing here yet.
      <Block fs='xs' my>
        Once your teacher assigns something it will appear here.
      </Block>
    </EmptyState>
  )
}

/**
 * Exports
 */

export default summonChannels(({currentUser}) =>
  currentUser.groups
    .filter(group => group.groupType === 'class')
    .map(cls => `group!${cls.id}.board`)
)({
  render
})
