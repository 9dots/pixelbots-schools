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
      <ActivityRow options={{pin: true}} ddMenu metaUi={ClassMeta} {...props} />
    )
  }
})

/**
 * <ClassMeta/>
 */

function ClassMeta ({props}) {
  const {activity, showClass} = props
  const {inverseTimestamp, contexts} = activity
  const text = showClass
    ? contexts[0].descriptor.displayName
    : 'Updated ' + moment(-inverseTimestamp).fromNow()

  return (
    <Text fs='xxs' color='grey_medium'>
      {text}
    </Text>
  )
}
