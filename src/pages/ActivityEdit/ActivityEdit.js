/**
 * Imports
 */

import ActivitySidebar from 'components/ActivitySidebar'
import ActivityEditor from 'components/ActivityEditor'
import {Block, Card} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <ActivityEdit/>
 */

function render ({props, local, state}) {
  const {activity, currentUser, speech} = props
  const isTeacher = currentUser.userType === 'teacher'

  return (
    <Block align='center start'>
      <ActivityEditor
        showAnswers
        activity={activity}
        speech={speech} />
      <Block w={200} ml relative fixed={{top: 53}}>
        <ActivitySidebar
          canSetMax
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
