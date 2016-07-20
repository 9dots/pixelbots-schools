/**
 * Imports
 */

import CommoncoreBadge from 'components/CommoncoreBadge'
import ActivityObject from 'components/ActivityObject'
import ActivityHeader from 'components/ActivityHeader'
import {setUrl} from 'redux-effects-location'
import {Block} from 'vdux-containers'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <Activity/>
 */

function getProps (props, context) {
  return {
    ...props,
    ...(context.uiMedia === 'print' ? (props.printProps || {}) : {})
  }
}

function render ({props}) {
  const {activity, clickableTags, currentUser, ...rest} = props
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
            currentUser={currentUser}
            activity={activity}
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
