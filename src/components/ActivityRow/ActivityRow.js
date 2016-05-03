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
      <Flex>
        <Flex column>
          <Text p='m' my='s' fs='s'>{displayName}</Text>
          <Text fs='xs'>{description}</Text>
          <Meta activity={activity} />
        </Flex>
        <Figure {...image} thumb />
        <badge/>
        <actions/>
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
