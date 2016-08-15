/**
 * Imports
 */

import CommoncoreBadge from 'components/CommoncoreBadge'
import ActivityObject from 'components/ActivityObject'
import ActivityHeader from 'components/ActivityHeader'
import {setUrl} from 'redux-effects-location'
import element from 'vdux/element'
import {Block} from 'vdux-ui'
import map from '@f/map'

/**
 * <Activity/>
 */

function getProps (props, context) {
  if (context.uiMedia === 'print') {
    return {...props, showAnswers: props.showAnswersOnPrint}
  }

  return props
}

function render ({props}) {
  const {activity, clickableTags, currentUser, selectObject, selectedObject, ...rest} = props
  const {
    displayName, _object, originalDescription,
    tags, commonCore
  } = activity
  const attachments = _object[0].attachments
  let i = 0

  return (
    <Block>
      <ActivityHeader
        activity={activity}
        clickableTags={clickableTags} />
      <Block>
        {
          map(object => <ActivityObject
            isSelected={selectedObject === object._id}
            selectObject={selectObject}
            currentUser={currentUser}
            actor={activity.actor}
            activityId={activity._id}
            object={object}
            idx={object.objectType === 'question' ? i++ : null}
            {...rest} />, activity._object[0].attachments)
        }
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  getProps,
  render
}
