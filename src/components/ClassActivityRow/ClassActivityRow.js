/**
 * Imports
 */

import ClassActivityBadge from 'components/ClassActivityBadge'
import ActivityRow from 'components/ActivityRow'
import {component, element} from 'vdux'
import {Text} from 'vdux-ui'
import moment from 'moment'

/**
 * <ClassActivityRow/>
 */

export default component({
  render ({props}) {
    return (
      <ActivityRow options={{pin: true}} ddMenu badgeUi={ClassActivityBadge} metaUi={ClassMeta} {...props} />
    )
  }
})

/**
 * <ClassMeta/>
 */

function ClassMeta ({props}) {
  const {activity} = props
  const {publishedAt} = activity

  return (
    <Text fs='xxs' color='grey_medium'>
      Assigned {moment(publishedAt).fromNow()}
    </Text>
  )
}
