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
    <Block pointer border='white' borderWidth='2px' py='4px' px='12px' opacity='0.8'>
      <Text tag='a' href={link} antialiased lh='21px' color='white' weight='400'>
        {children}
      </Text>
    </Block>
  )
}

/**
 * Exports
 */

export default {render}
