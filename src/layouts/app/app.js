/**
 * Imports
 */

import element from 'vdux/element'
import Nav from './Nav'

/**
 * App
 */

function render ({props, children}) {
  return (
    <div>
      <Nav {...props} />
      {children}
    </div>
  )
}

/**
 * Exports
 */

export default {
  render
}
