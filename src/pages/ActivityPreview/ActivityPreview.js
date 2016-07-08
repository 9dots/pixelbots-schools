/**
 * Imports
 */

import ActivitySidebar from 'components/ActivitySidebar'
import Activity from 'components/Activity'
import {Block, Card} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <ActivityPreview/>
 */

function render ({props}) {
  const {activity, currentUser} = props

  return (
    <Block align='center start'>
      <Card w='col_main' mx='auto' p align='space-around center'>
        <Activity activity={activity} />
      </Card>
      <Block w={200} ml>
        <ActivitySidebar activity={activity} currentUser={currentUser} />
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
