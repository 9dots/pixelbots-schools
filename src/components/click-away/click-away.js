/**
 * Imports
 */

import Document from 'vdux/document'
import element from 'vdux/element'

/**
 * clickAway
 */

function render ({path, props, children}) {
  return (
    <Document onClick={props.onClickedAway}>
      <span>
        {children}
      </span>
    </Document>
  )
}

/**
 * Exports
 */

export default {
  render
}
