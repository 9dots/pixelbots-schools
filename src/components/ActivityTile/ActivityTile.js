/**
 * Imports
 */

import {wrap, CSSContainer} from 'vdux-containers'
import {Flex, Block, Card, Text, Icon} from 'vdux-ui'
import WeoIcon from 'components/WeoIcon'
import {setUrl} from 'redux-effects-location'
import Figure from 'components/Figure'
import element from 'vdux/element'
import Meta from './Meta'

/**
 * Activity Tile
 */

function render ({props}) {
  const {activity} = props
  const {image, displayName, description} = activity

  return (
    <Card w={230} relative my={8} mx={6}>
      <Activity {...props} hoverProps={{hover: true}} />
      <Meta activity={activity} />
    </Card>
  )
}

const Activity = wrap(CSSContainer)({
  render ({props}) {
    const {activity, hover} = props
    const {image, displayName, description, _id, likers, repinCount, replies} = activity
    const url = `/activity/${_id}/public/preview`

    return (
      <Flex column cursor='zoom-in' pb onClick={() => setUrl(url)}>
        <actions/>
        <Figure {...image} thumb={true} opacity={hover && .88} />
        <Block textAlign='center' m='m'>
          <Text my='s' fs='s' display='block' fw='200'>{displayName}</Text>
          <Text fs='xxs' wordBreak='break-word'>{description}</Text>
        </Block>
        <Flex align='center center' color='grey' fs='xxs'>
          <Flex align='center center' hide={!likers.length}>
            <Icon name='favorite' fs='xs'/>
            <Text mr='4' ml='2'>{likers.length}</Text>
          </Flex>
          <Flex align='center center' hide={!repinCount}>
            <WeoIcon name='pin' fs='14' mb='-2'/>
            <Text mr='4' ml='2'>{repinCount}</Text>
          </Flex>
          <Flex align='center center' hide={!replies.canonicalTotal.items}>
            <Icon name='mode_comment' fs='xs' mb='-2'/>
            <Text mr='4' ml='2'>{replies.canonicalTotal.items}</Text>
          </Flex>
        </Flex>
      </Flex>
    )
  }
})

/**
 * Exports
 */

export default {
  render
}