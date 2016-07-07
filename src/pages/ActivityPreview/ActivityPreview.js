/**
 * Imports
 */

import Activity from 'components/Activity'
import {Block, Card} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <ActivityPreview/>
 */

function render ({props}) {
  const {activity} = props

  return (
    <Card w='col_main' mx='auto' p>
      <Activity activity={activity} />
    </Card>
  )
}

/**
 * Exports
 */

export default {
  render
}
