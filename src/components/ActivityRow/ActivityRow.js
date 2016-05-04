/**
 * Imports
 */

import {Flex, Block, Card, Text} from 'vdux-ui'
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
    <Card h={132} wide mt={0} borderBottom='rgba(52, 52, 52, 0.08)'>
      <Flex tall align='start center'>
        <Flex p='m' tall column align='space-around'>
          <Block my='s' fs='s'>{displayName}</Block>
          <Block fs='xs'>{description}</Block>
          <Meta activity={activity} />
        </Flex>
        <Figure {...image} thumb />
      </Flex>
    </Card>
  )
}

/**
 * Exports
 */

export default {
  render
}
