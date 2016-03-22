/**
 * Imports
 */

import {row, align} from 'lib/layout'
import element from 'vdux/element'
import {logo120} from 'lib/assets'
import {anchor} from 'lib/styles'
import css from 'jss-simple'

/**
 * homeOwl
 */

function render ({props}) {
  return (
    <a class={[anchor, row, align.start_center, props.class]} href='/' style={{padding: 0, marginRight: 12}}>
      <img src={logo120} width='28' />
    </a>
  )
}

/**
 * Exports
 */

export default {
  render
}
