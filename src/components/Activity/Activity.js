/**
 * Imports
 */

import CommoncoreBadge from 'components/CommoncoreBadge'
import ActivityObject from 'components/ActivityObject'
import element from 'vdux/element'
import {Block} from 'vdux-ui'
import map from '@f/map'

/**
 * <Activity/>
 */

function render ({props}) {
  const {activity} = props
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
        <Block align='start center'>
          {
            map(({displayName}) => <Label text={displayName} />, tags)
          }
          <CommoncoreBadge hide={!commonCore} placement='right' />
        </Block>
      </Block>
      {
        map(object => <ActivityObject object={object} idx={object.objectType === 'question' ? i++ : null} />, attachments)
      }
    </Block>
  )
}

function Label({props}) {
  const {text} = props
  return (
    <Block
      color='white'
      lh='24px'
      bg='blue'
      fs='xxs'
      mr='s'
      pill
      px>
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
