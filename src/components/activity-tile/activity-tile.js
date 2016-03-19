/**
 * Imports
 */

import {mrg_vert, mrg_right, xx_small, bold, link, ellipsis} from 'lib/styles'
import {Flex, Block, Card, Text} from 'vdux-ui'
import Figure from 'components/figure'
import element from 'vdux/element'
import css from 'jss-simple'
import Meta from './meta'

/**
 * Activity Tile
 */

function render ({props}) {
  const {activity} = props
  const {image, displayName, description} = activity

  return (
    <Card class={tile}>
      <Flex column>
        <actions/>
        <Figure {...image} thumb={true} />
        <Block textAlign='center' m={2}>
          <Text p={1} my={2} fs={2}>{displayName}</Text>
          <Text fs={1}>{description}</Text>
        </Block>
        <Meta activity={activity} />
      </Flex>
    </Card>
  )
}

/**
 * Styles
 */

const {tile} = css({
  tile: {
    width: 230,
    position: 'relative',
    margin: '8px 6px'
  }
})

/**
 * Exports
 */

export default {
  render
}
