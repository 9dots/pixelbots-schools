/**
 * Imports
 */

import CommoncoreBadge from 'components/CommoncoreBadge'
import ActivityObject from 'components/ActivityObject'
import {setUrl} from 'redux-effects-location'
import {Block} from 'vdux-containers'
import element from 'vdux/element'
import summon from 'vdux-summon'
import map from '@f/map'

/**
 * <Activity/>
 */

function render ({props}) {
  const {activity, currentUser, ...rest} = props
  const isTeacher = currentUser.userType === 'teacher'
  const {
    displayName, _object, originalDescription,
    tags, commonCore
  } = activity
  const attachments = _object[0].attachments
  let i = 0

  return (
    <Block>
      <Block p='12px 24px'>
        <Block fs='xl' fw='800'>{displayName}</Block>
        <Block mt='s' lighter>{originalDescription}</Block>
        <Block align='start center' mt='xs'>
          {
            map(({displayName}) => <Label text={displayName} isTeacher={isTeacher} />, tags)
          }
          <CommoncoreBadge hide={!commonCore} placement='right' />
        </Block>
      </Block>
      {
        map(object => <ActivityObject
          currentUser={currentUser}
          activity={activity}
          object={object}
          idx={object.objectType === 'question' ? i++ : null}
          {...rest} />, attachments)
      }
    </Block>
  )
}

function Label({props}) {
  const {text, isTeacher} = props
  const teacherProps = isTeacher
    ? {
        onClick: () => setUrl(`/search/activities/${text}`),
        pointer: true,
        hoverProps: {
          bgColor: 'transparent',
          color: 'blue'
        }
      }
    : {}

  return (
    <Block
      border='1px solid blue'
      color='white'
      lh='22px'
      bg='blue'
      fs='xxs'
      mr='s'
      pill
      px
      {...teacherProps}>
      {text}
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
