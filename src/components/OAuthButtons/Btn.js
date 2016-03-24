/**
 * Imports
 */

import {Button, Block, Text} from 'vdux-ui'
import element from 'vdux/element'
import Hover from 'vdux-hover'

/**
 * Generic OAuth Button
 */

function render ({props, children}) {
  return (
    <Hover>
      {
        hover => (
          <Button rounded relative px='25px' width='calc(50% - 6px)' float='left' {...props} border='rgba(0, 0, 0, 0.15)' style={{
            opacity: hover ? 1 : 0.9
          }}>
            <Block absolute='top left 33px' height='100%' borderLeft='rgba(52, 52, 52, 0.08)' />
            <Text ml='15px' fs='12px' lh='41px'>
              {children}
            </Text>
          </Button>
        )
      }
    </Hover>
  )
}

/**
 * Exports
 */

export default {
  render
}
