/**
 * Imports
 */

import ActivitySidebar from 'components/ActivitySidebar'
import ActivityEditor from 'components/ActivityEditor'
import {Block, Card} from 'vdux-ui'
import element from 'vdux/element'
import getProp from '@f/get-prop'

/**
 * <ActivityEdit/>
 */

function render ({props, local, state}) {
  const {activity, currentUser, speech} = props
  const isTeacher = currentUser.userType === 'teacher'
  const defaultPoints = getProp('preferences.max_points', currentUser)

  return (
    <Block align='center start'>
      <ActivityEditor
        defaultPoints={defaultPoints}
        activity={activity}
        speech={speech}
        showAnswers/>
      <Block w={200} ml relative fixed={{top: 53}}>
        <ActivitySidebar canSetMax activity={activity} />
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
