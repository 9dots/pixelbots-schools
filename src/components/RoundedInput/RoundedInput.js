/**
 * Imports
 */

import {Input} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <RoundedInput/>
 */

function render ({props}) {
  return (
    <Input
      fs='xs'
      fw='lighter'
      border='1px solid rgba(75, 82, 87, 0.15)'
      focusProps={{
        border: '1px solid rgba(37, 168, 224, 0.35)'
      }}
      inputProps={{
        textAlign: 'center',
        pill: true,
        px: 20,
        py: 10,
        boxShadow: '0 0',
        bgColor: 'white',
        color: '#777'
      }}
      {...props}
       />
  )
}

/**
 * Exports
 */

export default {
  render
}
