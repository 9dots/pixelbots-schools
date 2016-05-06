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
      <Text tag='h1' fs={55} fw='600' lh='55px' mb='24' mt='0'>
        Empower Your Classroom
      </Text>
      <Text tag='h4' lh='36px' fs={28} m='auto auto 12px' maxWidth={600}>
        Free For Teachers Forever!
      </Text>
      <Button hoverProps={{opacity: 1}} opacity={0.85} icon='play_circle_fill' fs='90px' lh='80px' pointer mt='m' />
    </Block>
  )
}

/**
 * Exports
 */

export default render
