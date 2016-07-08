/**
 * Imports
 */

import ActivityObject from 'components/ActivityObject'
import {Block} from 'vdux-ui'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <Activity/>
 */

function render ({props}) {
  const {activity} = props
  const {displayName, _object} = activity
  const attachments = _object[0].attachments
  let i = 0
  return (
    <Block>
      <Block fs='xl' p='12px 24px' fw='800'>
        {displayName}
      </Block>
      {
        map(object => <ActivityObject object={object} idx={object.objectType === 'question' ? i++ : null} />, attachments)
      }
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
