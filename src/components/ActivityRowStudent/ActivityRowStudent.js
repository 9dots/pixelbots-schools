/**
 * Imports
 */

import ActivityBadge from 'components/ActivityBadge'
import ActivityRow from 'components/ActivityRow'
import {Text} from 'vdux-ui'
import element from 'vdux/element'
import getProp from '@f/get-prop'
import reduce from '@f/reduce'
import moment from 'moment'


/**
 * <ClassActivityRow/>
 */

function render ({props}) {
  return (
    <ActivityRow badgeUi={StudentBadge} metaUi={StudentMeta} {...props} />
  )
}

function StudentBadge ({props}) {
  const {activity, currentUser} = props
  const {_id, userType} = currentUser
  const status = getProp(`instances.total.0.actors.${_id}.status`, activity)

  return (
    <ActivityBadge status={status} userType={userType} mr={-1} />
  )
}

function StudentMeta ({props}) {
  const {activity} = props
  const {publishedAt} = activity

  return (
    <Text fs='xxs' color='grey_medium'>
      Assigned {moment(publishedAt).fromNow()}
    </Text>
  )
}


/**
 * Exports
 */

export default {
  render
}
