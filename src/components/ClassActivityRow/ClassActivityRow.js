/**
 * Imports
 */

import ClassActivityBadge from 'components/ClassActivityBadge'
import ActivityRow from 'components/ActivityRow'
import element from 'vdux/element'
import {Text} from 'vdux-ui'
import moment from 'moment'

/**
 * <ClassActivityRow/>
 */

function render ({props}) {
  return (
    <ActivityRow actions={{pin: true}} ddMenu={true} badgeUi={ClassActivityBadge} metaUi={ClassMeta} {...props} />
  )
}

function ClassMeta ({props}) {
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
