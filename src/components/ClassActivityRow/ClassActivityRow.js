/**
 * Imports
 */

import ActivityRow from 'components/ActivityRow'
import element from 'vdux/element'
import {Flex, Text} from 'vdux-ui'
import reduce from '@f/reduce'
import moment from 'moment'

/**
 * <ClassActivityRow/>
 */

function render ({props}) {
  return (
    <ActivityRow badgeUi={ClassBadge} metaUi={ClassMeta} {...props} />
  )
}

function ClassBadge ({props}) {
  const {activity, currentUser} = props
  const counts = reduce((acc, actor) => {
    const type = actor.status <= 2
      ? 'notDone'
      : actor.status === 5 ? 'returned' : 'turnedIn'

    acc[type]++
    return acc
  }, {returned: 0, turnedIn: 0, notDone: 0}, activity.instances.total[0].actors || {})

  return (
    <Flex align='start center' mt mr fs='xxs'>
      <Flex column align='center center' mr='s'>
        <Text>Returned</Text>
        <Text>{counts.returned}</Text>
      </Flex>
      <Flex column align='center center' mr='s'>
        <Text>Turned In</Text>
        <Text>{counts.turnedIn}</Text>
      </Flex>
      <Flex column align='center center'>
        <Text>Not Done</Text>
        <Text>{counts.notDone}</Text>
      </Flex>
    </Flex>
  )
}

function ClassMeta ({props}) {
  const {activity} = props
  const {publishedAt} = activity

  return (
    <Text fs='xxs' color='lightgrey'>
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
