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
  const {activity, currentUser, setSpeaking, speakingId, speechRate, save, setIndicator, savingIndicator, selectObject, selectedObject} = props
  const isTeacher = currentUser.userType === 'teacher'
  const defaultPoints = getProp('preferences.max_points', currentUser)

  return (
    <Block align='center start'>
      <Block align='end start'>
        <ActivityEditor
          savingIndicator={savingIndicator}
          selectedObject={selectedObject}
          defaultPoints={defaultPoints}
          selectObject={selectObject}
          setIndicator={setIndicator}
          setSpeaking={setSpeaking}
          speakingId={speakingId}
          speechRate={speechRate}
          activity={activity}
          showAnswers />
        <Block w={200} relative fixed={{top: 53}} float='right'>
          <ActivitySidebar canSetMax activity={activity} selectObject={selectObject} selectedObject={selectedObject} />
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
