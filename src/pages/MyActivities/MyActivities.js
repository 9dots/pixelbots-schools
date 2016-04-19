/**
 * Imports
 */

import ActivitiesLayout from 'layouts/ActivitiesLayout'
import element from 'vdux/element'

/**
 * <MyActivities/> page
 */

function render ({props}) {
  const {boards = [], activities = []} = props

  return (
    <ActivitiesLayout {...props}>
    </ActivitiesLayout>
  )
}

/**
 * Exports
 */

export default {
  render
}
