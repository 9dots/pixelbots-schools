/**
 * Imports
 */

import element from 'vdux/element'
import css from 'jss-simple'

/**
 * decoLine
 */

function render () {
  return <span class={line}></span>
}

/**
 * Styles
 */

const {line} = css({
  line: {
    borderTop: '1px solid #000',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    width: '36%'
  }
})

/**
 * Exports
 */

export default render
