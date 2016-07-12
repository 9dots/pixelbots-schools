/**
 * Imports
 */

import ActivitySidebar from 'components/ActivitySidebar'
import Activity from 'components/Activity'
import {Block, Card} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <ActivityInstance/>
 */

function render ({props}) {
  const {activity, currentUser} = props
  const answerable = currentUser.userType === 'student'

  return (
    <Block align='center start'>
      <Card w={756} mb='l' >
        <Activity
          activity={activity}
          currentUser={currentUser}
          showAnswers={false}
          answerable={answerable} />
      </Card>
      <Block w={200} ml relative fixed={{top: 53}}>
        <ActivitySidebar
          activity={activity}
          currentUser={currentUser} />
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
