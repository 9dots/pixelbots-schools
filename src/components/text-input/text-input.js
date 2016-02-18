/**
 * Imports
 */

import element from 'vdux/element'
import css from 'jss-simple'

/**
 * textInput
 */

function render ({props}) {
  return (
    <div>
      <input type={type} placeholder={placeholder} />
      <span>
        {error}
      </span>
    </div>
  )
}

/**
 * Exports
 */

export default {
  render
}
