/**
 * Imports
 */

import ActivitiesLayout from 'layouts/ActivitiesLayout'
import element from 'vdux/element'

/**
 * <Drafts/>
 */

function render ({props}) {
  return (
    <ActivitiesLayout {...props}>
      <div>Drafts!</div>
    </ActivitiesLayout>
  )
}

/**
 * Exports
 */

export default {
  render
}
