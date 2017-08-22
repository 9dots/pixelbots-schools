/**
 * Imports
 */

import ActivityRowStudent from 'components/ActivityRowStudent'
import ClassActivityRow from 'components/ClassActivityRow'
import CreateClassModal from 'modals/CreateClassModal'
import JoinSchoolModal from 'modals/JoinSchoolModal'
import JoinClassModal from 'modals/JoinClassModal'
import summonChannels from 'lib/summon-channels'
import EmptyState from 'components/EmptyState'
import PageTitle from 'components/PageTitle'
import {Block, Card, Text} from 'vdux-ui'
import RowFeed from 'components/RowFeed'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import fire from 'vdux-fire'

/**
 * Constants
 */

const itemProps = {showClass: true}

/**
 * <AllClasses/>
 */

export default component({
  * onCreate ({props, context}) {
    if (props.currentUser.value && !Object.keys(props.currentUser.schools || {}).length) {
      yield context.openModal(() => <JoinSchoolModal />)
    }
  },

  render ({props}) {
    const {currentUser} = props
    const {userType, preferences = {}} = currentUser
    const item = ClassActivityRow

    if (!preferences.group_joined) return <Join />

    return (
      <Block maxWidth='714px' mx='auto' relative>
        <PageTitle title='Weo' />
        <Card p fs='s' lighter mb>
          All Classes
        </Card>
        <Block>
          {
            Object
              .keys(currentUser.teacherOf || {})
              .map(key => (
                <ClassTile groupId={key} />
              ))
          }
        </Block>
        <RowFeed {...props} itemProps={itemProps} item={item} emptyState={<Empty />} />
      </Block>
    )
  }
})

/**
 * <ClassTile/>
 */

const ClassTile = fire(props => ({
  group: `/classes/${props.groupId}`
}))(component({
  render ({props}) {
    const {groupId, group} = props

    if (group.loading) return <span/>

    return (
      <Block onClick={context.setUrl(`/class/${props.groupId}/feed`)}>
        {
          group.value.displayName
        }
      </Block>
    )
  }
}))

/**
 * <Join/>
 */

const Join = component({
  render ({props, actions}) {
    const {isTeacher} = props

    return (
      <EmptyState icon='school' color='blue' fill>
        <Block fs='m' m>Welcome to Weo!</Block>
        <Button
          onClick={actions.createClass}
          color='white'
          bgColor='green'
          boxShadow='z2'
          border='1px solid rgba(black, .1)'
          py='16px'
          px='40px'
          lighter
          fs='s'
          m='l'>
          Create My First Class
        </Button>
        <Block>
          <Text bold>Classes </Text> let you deliver engaging, interactive activities to your students. <Text bold>Click the button</Text> above to create your first class.
        </Block>
      </EmptyState>
    )
  },

  controller: {
    * joinClass ({context}) {
      yield context.openModal(() => <JoinClassModal />)
    },

    * createClass ({context}) {
      yield context.openModal(() => <CreateClassModal userId={context.userId} />)
    }
  }
})

/**
 * <Empty/>
 */

function Empty ({props}) {
  return (
    <EmptyState icon='assignment' color='green' fill py='60'>
      Nothing here yet.
      <Block fs='xs' my>
        Once you assign an Activity to any of your classes, it will show up here.
      </Block>
    </EmptyState>
  )
}
