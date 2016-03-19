/**
 * Imports
 */

import CommoncoreBadge from 'components/commoncore-badge'
import {Flex, Box, Text, Block} from 'vdux-ui'
import Avatar from 'components/avatar'
import element from 'vdux/element'
import {link} from 'lib/styles'
import filter from '@f/filter'
import map from '@f/map'

/**
 * Meta bar
 */

function render ({props}) {
  const {activity} = props
  const {commonCore, actor} = activity
  const board = getBoard(activity)

  return (
    <Block px={12} py={6} mt={12} fs={0} borderTop='rgba(0, 0, 0, 0.04)' bgColor='#FCFCFC'>
      <Flex align='start center'>
        <Avatar mr={1} actor={actor} />
        <Box flex ellipsis style={{lineHeight: '18px'}}>
          <Flex column align='space-around'>
            <Text bold class={link}>{actor.displayName}</Text>
            <Text>{board.displayName}</Text>
          </Flex>
        </Box>
        <Box>
          <CommoncoreBadge />
        </Box>
      </Flex>
    </Block>
  )
}

/**
 * Helpers
 */

function getBoard (activity) {
  const ctx = activity.contexts[1]
  return ctx && ctx.descriptor.id !== 'me' && ctx.descriptor
}

/**
 * Exports
 */

export default {
  render
}
