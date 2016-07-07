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

  return (
    <Block>
      <Block fs='xl' p='12px 24px' fw='800'>
        {displayName}
      </Block>
      {
        map((object, i) => <ActivityObject object={object} idx={i} />, attachments)
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
