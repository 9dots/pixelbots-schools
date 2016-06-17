/**
 * Imports
 */

import ActivityRow from 'components/ActivityRow'
import element from 'vdux/element'
import {Flex, Text, Icon, Block} from 'vdux-ui'
import reduce from '@f/reduce'
import getProp from '@f/get-prop'
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
  const status = getProp(`instances.total.0.actors.${_id}.status`, activity) || 1

  const height = 19
  const color = userType === 'teacher'
    ? statusColorTeacher[status]
    : statusColorStudent[status]

  return (
    <Flex align='end' color={color}>
      <Text mt={height/1.5} mr={height/1.5} uppercase fs='xxs'>
        {statusNames[status]}
      </Text>
      <Flex align='center center' sq={height} color='white' relative>
        <Icon name={statusIcon[status]} fs='xs' z='1' mr={3} mt={3}/>
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


const statusNames = {
  '1': 'not started',
  '2': 'started',
  '3': 'turned in',
  '4': 'graded',
  '5': 'returned'
}

const statusIcon = {
  '1': 'subject',
  '2': 'schedule',
  '3': 'file_download',
  '4': 'assignment',
  '5': 'check'
}

const statusColorTeacher = {
  '1': 'blue',
  '2': 'blue',
  '3': 'yellow',
  '4': 'yellow',
  '5': 'green'
}

const statusColorStudent = {
  '1': 'yellow',
  '2': 'yellow',
  '3': 'blue',
  '4': 'blue',
  '5': 'green'
}


/**
 * Exports
 */

export default {
  render
}
