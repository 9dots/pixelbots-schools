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
    <Card w={230} relative my={8} mx={6}>
      <Flex column>
        <actions/>
        <Figure {...image} thumb={true} />
        <Block textAlign='center' m='m'>
          <Text p='m' my='s' fs='s'>{displayName}</Text>
          <Text fs='xs'>{description}</Text>
        </Block>
        <Meta activity={activity} />
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
