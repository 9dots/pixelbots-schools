/**
 * Imports
 */

import {col_med, white, x_large, bolder, mrg_bottom, medium, mrg_vert, ln30, small, mrg_top} from 'lib/styles'
import BlockInput from 'components/block-input'
import {column, row, align} from 'lib/layout'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * teacherSignup
 */

function render ({props}) {
  return (
    <div class={row}>
      <div class={[column, col_med, white, align.center]}>
        <div class={[x_large, bolder, mrg_bottom]} style={{marginTop: '-30px'}}>
          Welcome to Weo
        </div>
        <div class={[medium, mrg_vert, ln30]}>
          Join our growing community<br />
          of edudcators today.
        </div>
        <div class={[small, mrg_top]}>
          Free for teachers. Forever.
        </div>
      </div>
      <div class={[column, col_med, white, align.center_center]}>
        <BlockInput placeholder='FULL NAME' />
        <BlockInput placeholder='EMAIL' />
        <BlockInput placeholder='PASSWORD' type='password' />
      </div>
    </div>
  )
}

/**
 * Exports
 */

export default {
  render
}
