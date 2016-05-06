/**
 * Imports
 */

import {Block, Text} from 'vdux-ui'
import element from 'vdux/element'

/**
 * Render
 */

function render ({props, children}) {
  const {link} = props

  return (
    <Block tag='a' href={link} pointer border='white' borderWidth='2px' py='4px' px='12px' opacity='0.8'>
      <Text antialiased lh='21px' color='white' fw='400'>
        {children}
      </Text>
    </Block>
  )
}

/**
 * Exports
 */

export default {render}
