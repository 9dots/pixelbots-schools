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
  const {activity, currentUser, speech, save, setIndicator, savingIndicator} = props
  const isTeacher = currentUser.userType === 'teacher'
  const defaultPoints = getProp('preferences.max_points', currentUser)

  return (
    <Block align='center start'>
      <Block align='end start'>
        <ActivityEditor
          savingIndicator={savingIndicator}
          defaultPoints={defaultPoints}
          setIndicator={setIndicator}
          activity={activity}
          speech={speech}
          showAnswers />
        <Block w={200} relative fixed={{top: 53}} float='right'>
          <ActivitySidebar canSetMax activity={activity} />
        </Block>
        <Block w={200} ml />
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
