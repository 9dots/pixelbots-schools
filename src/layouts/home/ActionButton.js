/**
 * Imports
 */

import {lighter, white} from 'lib/styles'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Render
 */

function render ({props, children}) {
  const {link} = props

  return (
    <div class={[lighter, white, btn]}>
      <a href={link} class={anchor}>
        {children}
      </a>
    </div>
  )
}

/**
 * Style
 */

const {btn, anchor} = css({
  btn: {
    textAlign: 'right',
    lineHeight: '21px',
    cursor: 'pointer'
  },
  anchor: {
    display: 'block',
    padding: '4px 12px',
    color: '#fff',
    border: '2px solid white',
    opacity: '0.8',
    fontWeight: '400',
    '-webkit-font-smoothing': 'antialiased'
  }
})

/**
 * Exports
 */

export default {render}
