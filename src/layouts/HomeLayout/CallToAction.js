/**
 * Imports
 */

import schoolPattern from './files/pattern.png'
import {Block, Text, Button} from 'vdux-ui'
import {scrollTo} from 'middleware/scroll'
import element from 'vdux/element'

/**
 * Call To Action Layout
 */

function render () {

  return (
    <Block bg={`url(${schoolPattern}) blue`} p='100px' textAlign='center' color='white'>
      <Text fs='xl' fw='bolder' display='block'>
        Free for Teachers and Students!
      </Text>
      <Text fs='m' fw='lighter' maxWidth='700px' display='block' m='24px auto' lh='40px'>
        Save time with auto-graded assignments. Join our community and start creating and sharing activities today.
      </Text>
      <Button
        bgColor='yellow'
        boxShadow='menu'
        p='s'
        fs='18px'
        w='200'
        onClick={e => scrollTo('header', {easing: 'easeOutCubic', duration: 500})}>Sign Up Free!</Button>
    </Block>
  )
}


/**
 * Exports
 */

export default {
  render
}

