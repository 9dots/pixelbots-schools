/**
 * Imports
 */

import {Card, Block, Text, Icon} from 'vdux-ui'
import Avatar from 'components/Avatar'
import element from 'vdux/element'
import moment from 'moment'

/**
 * <ActivitySidebar/>
 */

function render ({props}) {
  const {currentUser, activity} = props
  const {actor, publishedAt, _object} = activity
  const questions = _object[0].attachments
    .filter(att => att.objectType === 'question')

  return (
    <Block mt>
      <Card mb align='start center'>
        <Avatar m actor={actor} size={80} />
        <Block column align='start center'>
          <Text bold>{actor.displayName}</Text>
          <Text color='grey_light'>
            <Icon name='schedule' />
            {moment(publishedAt).fromNow()}
          </Text>
        </Block>
      </Card>
      <Card>
        <Block fs='xl' borderBottom='1px solid grey_light'>
          -- / {totalPoints(activity)}
        </Block>
        <Block>
          {
            questions.map((q, i) => (
              <Block align='space-between center' borderBottom='1px solid grey_light'>
                <Text>
                  {i + 1}. <Icon name='done_all' />
                </Text>
                <Text>{q.points.max * q.points.scaled} / {q.points.max}</Text>
              </Block>
            ))
          }
        </Block>
      </Card>
    </Block>
  )
}

function totalPoints (activity) {
  if (!activity._object || !activity._object[0] || !activity._object[0].attachments) return

  return activity._object[0].attachments
    .reduce((total, att) => total +
      (att.objectType === 'question' && !att.poll
        ? att.points.max
        : 0), 0)
}

/**
 * Exports
 */

export default {
  render
}
