/**
 * Imports
 */

import CommoncoreBadge from 'components/CommoncoreBadge'
import ActivityObject from 'components/ActivityObject'
import {setUrl} from 'redux-effects-location'
import {Block} from 'vdux-containers'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <Activity/>
 */

function getProps (props, context) {
  return {
    ...props,
    ...(context.uiMedia === 'print' ? (props.printProps || {}) : {})
  }
}

function render ({props}) {
  const {activity, clickableTags, currentUser, ...rest} = props
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
            map(({displayName}) => <Label text={displayName} clickable={clickableTags} />, tags)
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
  const {text, clickable} = props
  const clickableProps = clickable
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
      {...clickableProps}>
      {text}
    </Block>
  )
}

/**
 * Exports
 */

export default {
  getProps,
  render
}
