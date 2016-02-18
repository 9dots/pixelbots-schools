/**
 * Imports
 */

import {shadow} from 'lib/styles/constants'
import {white, text_color} from 'lib/colors'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * card
 */

function render ({children, props}) {
  return (
    <div class={[card, props.class]}>
      {children}
    </div>
  )
}

/**
 * Style
 */

const {card} = css({
  card: {
    color: text_color,
    lineHeight: '18px',
    background: white,
    marginTop: 14,
    boxShadow: shadow.card
  }
})

/**
 * Exports
 */

export default {
  render
}
