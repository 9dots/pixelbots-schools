/**
 * Imports
 */

import element from 'vdux/element'
import {Block} from 'vdux-ui'
import Nav from './Nav'

/**
 * App
 */

function render ({props, children}) {
  return (
    <Block>
      <Nav {...props} />
      {children}
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
