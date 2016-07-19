/**
 * Imports
 */

import ActivitySidebar from 'components/ActivitySidebar'
import summonChannels from 'lib/summon-channels'
import {statusMap} from 'lib/activity-helpers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import Activity from 'components/Activity'
import InstanceNav from './InstanceNav'
import {Block, Card} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <ActivityInstance/>
 */


function render ({props, local, state}) {
  const {activity, instance, currentUser, students, instances, activities} = props
  const isTeacher = currentUser.userType === 'teacher'
  const isStudent = currentUser.userType === 'student'
  const isReturned = activity.status === statusMap.returned
  const isRedo = activity.at && activity.at.turnedIn && (activity.status === statusMap.opened)
  const commentsShown = state.commentsId

  const {loaded, error, value} = activities

  if(!loaded) return <span />
  const comments = value.items

  return (
    <Block align='center start'>
      <Card
        transform={`translate3d(-${commentsShown ? 50 : 0}px, 0, 0)`}
        transition='transform 0.35s'
        w={756}
        z={1}
        mb='l'>
        <Activity
          showComments={local(showComments)}
          commentsId={state.commentsId}
          comments={comments}
          activity={instance}
          currentUser={currentUser}
          clickableTags={isTeacher}
          showIncorrect={isRedo || activity.status === statusMap.returned}
          showAnswers={isTeacher || activity.status === statusMap.returned}
          answerable={isStudent && activity.status <= statusMap.opened} />
      </Card>
      <Block
        fixed={{top: 53}}
        transition='opacity 0.35s'
        opacity={commentsShown ?  0.07 : 1}
        pointerEvents={commentsShown ? 'none' : 'all'}
        w={200}
        ml>
        <ActivitySidebar
          canGrade={isTeacher && activity.status >= statusMap.turnedIn}
          canSetMax={false}
          isRedo={isRedo}
          isStudent={isStudent}
          showScores={isTeacher || isReturned}
          activity={instance} />
        {
          isTeacher && <InstanceNav {...props} />
        }
      </Block>
      <Block w={200}/>
    </Block>
  )
}

const showComments = createAction('<ActivityInstance/>: showComments')

const reducer = handleActions({
  [showComments]: (state, id) => ({...state, commentsId: id}),
})


/**
 * Exports
 */

export default summonChannels(
   ({instance}) => `share!${instance.id}.annotations`
)({
  render,
  reducer
})