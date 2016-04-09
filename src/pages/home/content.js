/**
 * Imports
 */

import {Block, Button, Text} from 'vdux-containers'
import element from 'vdux/element'
import {Icon} from 'vdux-ui'

/**
 * Homepage content block
 */

function render () {
  return (
    <Block>
      <Text tag='h1' font='600 65px/65px Lato,Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif'>
        Teach Better, Together.
      </Text>
      <Text tag='h4' lh='36px' fs={28} m='auto auto 12px' style={{maxWidth: '600px'}}>
        Create and share educational activities with colleagues and students
      </Text>
      <Button hoverProps={{opacity: 1}} opacity={0.85} icon='play_circle_fill' fs='90px' lh='90px' pointer />
    </Block>
  )
}

/**
 * Exports
 */

export default render
