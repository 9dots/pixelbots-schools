/**
 * Imports
 */

import ActivitySidebar from 'components/ActivitySidebar'
import {statusMap} from 'lib/activity-helpers'
import Activity from 'components/Activity'
import {Block, Card} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <ActivityInstance/>
 */

function render ({props}) {
  const {activity, currentUser} = props
  const isTeacher = currentUser.userType === 'teacher'
  const isStudent = currentUser.userType === 'student'
  const isReturned = activity.status === statusMap.returned

  return (
    <Block align='center start'>
      <Card w={756} mb='l' >
        <Activity
          activity={activity}
          clickableTags={isTeacher}
          showAnswers={false}
          answerable={isStudent} />
      </Card>
      <Block w={200} ml relative fixed={{top: 53}}>
        <ActivitySidebar
          canGrade={isTeacher}
          canSetMax={false}
          showScores={isTeacher || isReturned}
          activity={activity} />
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
