/**
 * Imports
 */

import CommoncoreBadge from 'components/CommoncoreBadge'
import ActivityObject from 'components/ActivityObject'
import ActivityHeader from 'components/ActivityHeader'
import {setUrl} from 'redux-effects-location'
import {Block} from 'vdux-containers'
import element from 'vdux/element'
import summon from 'vdux-summon'
import map from '@f/map'

/**
 * <Activity/>
 */

function render ({props}) {
  const {activity, clickableTags, ...rest} = props
  let i = 0

  return (
    <Block>
      <ActivityHeader
        activity={activity}
        clickableTags={clickableTags} />
      <Block>
        {
          map(object => <ActivityObject
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
  render
}
