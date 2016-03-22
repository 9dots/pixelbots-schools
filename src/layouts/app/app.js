/**
 * Imports
 */

import element from 'vdux/element'
import css from 'jss-simple'
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
