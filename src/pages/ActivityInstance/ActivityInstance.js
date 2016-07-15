/**
 * Imports
 */

import ActivitySidebar from 'components/ActivitySidebar'
import {statusMap} from 'lib/activity-helpers'
import Activity from 'components/Activity'
import InstanceNav from './InstanceNav'
import {Block, Card} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <ActivityInstance/>
 */

function render ({props}) {
  const {activity, instance, currentUser, students, instances} = props
  const isTeacher = currentUser.userType === 'teacher'
  const isStudent = currentUser.userType === 'student'
  const isReturned = activity.status === statusMap.returned
  const isRedo = activity.at && activity.at.turnedIn && (activity.status === statusMap.opened)

  return (
    <Block align='center start'>
      <Card w={756} mb='l' >
        <Activity
          activity={instance}
          clickableTags={isTeacher}
          showIncorrect={isRedo || activity.status === statusMap.returned}
          showAnswers={isTeacher || activity.status === statusMap.returned}
          answerable={isStudent && activity.status <= statusMap.opened} />
      </Card>
      <Block w={200} ml relative fixed={{top: 53}}>
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

/**
 * Exports
 */

export default {
  render
}
