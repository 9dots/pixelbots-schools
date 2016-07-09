/**
 * Imports
 */

import {questionIcon, totalPoints} from 'lib/activity-helpers'
import {Card, Block, Text, Icon} from 'vdux-ui'
import Avatar from 'components/Avatar'
import Link from 'components/Link'
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

  const {descriptor} = activity.contexts[0]
  const classId = descriptor.id

  return (
    <Block mt>
      <Card mb align='start center'>
        <Avatar m actor={actor} size={66} border='2px solid white' boxShadow='card' />
        <Block column align='start' fs='xs'>
          <Link href={`/${actor.username}`} bold hoverProps={{textDecoration: 'underline'}}>{actor.displayName}</Link>
          <Text p='xs' hide={classId === 'public'} color='blue'>
            {descriptor.displayName}
          </Text>
          <Text fs='xxs' color='grey_medium' align='start center'>
            <Icon fs='14px' name='schedule' />
            {moment(publishedAt).fromNow()}
          </Text>
        </Block>
      </Card>
      <Card>
        <Block p fs='l' borderBottom='1px solid grey_light' fw='lighter' align='center center'>
          -- / {totalPoints(activity)}
        </Block>
        <Block>
          {
            questions.map((q, i) => (
              <Block fw='lighter' p color='grey_medium' fs='s' align='space-between center' borderBottom='1px solid grey_light'>
                <Text align='start center'>
                  {i + 1}. <Icon pl='s' fs='xs' name={questionIcon(q)} />
                </Text>
                <Text>{
                    q.points.scaled === undefined
                      ? '--'
                      : q.points.max * q.points.scaled
                  } <Text color='black'>/</Text> {q.points.max}
                </Text>
              </Block>
            ))
          }
        </Block>
      </Card>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
