/**
 * Imports
 */

import {red, yellow, green, blue} from 'lib/colors'
import {Block, Text} from 'vdux-ui'
import element from 'vdux/element'
import times from '@f/times'

/**
 * Constants
 */

const colors = [red, yellow, green, blue]

/**
 * Loading
 */

function render ({props}) {
  return (
    <Text absolute m='auto' w={200} h={100} textAlign='center' top={0} right={0} bottom={0} left={0}>
      <Block mt='m'>
        <Text lh='30px' weight='lighter'>Loading…</Text>
      </Block>
      <Block mt='m' pt='m'>
        {
          times(4, i => (
            <Block
              my={0}
              mx={3}
              inlineBlock
              bgColor={colors[i]}
              circle
              sq={15}
              transform='translateY(0)'
              animation='wave 2s infinite ease-in-out'
              animationDelay={0.1 * (i + 1) + 's'} />))
        }
      </Block>
    </Text>
  )
}

/**
 * Exports
 */

export default {
  render
}
