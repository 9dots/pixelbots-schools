/**
 * Imports
 */

import ActivityRow from 'components/ActivityRow'
import element from 'vdux/element'
import {Flex, Text, Icon, Block} from 'vdux-ui'
import reduce from '@f/reduce'
import getProp from '@f/get-prop'
import moment from 'moment'
import statusMap from 'lib/status'

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
  const status = statusMap[getProp(`instances.total.0.actors.${_id}.status`, activity) || 1]

  const height = 19
  const color = userType === 'teacher'
    ? status.teacherColor
    : status.studentColor

  return (
    <Flex align='end' color={color}>
      <Text mt={height/1.5} mr={height/1.5} uppercase fs='xxs'>
        {status.displayName}
      </Text>
      <Flex align='center center' sq={height} color='white' relative>
        <Icon name={status.icon} fs='xs' z='1' mr={3} mt={3}/>
        <Block absolute='top right' border={`${height}px solid ${color}`} borderBottomColor='transparent' borderLeftColor='transparent' />
      </Flex>
    </Flex>
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
