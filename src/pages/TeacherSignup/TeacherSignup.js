/**
 * Imports
 */

import {col_med, col_sm, white, x_large, bolder, mrg_bottom, medium, mrg_vert, ln30, small, mrg_top, wide, mrg} from 'lib/styles'
import {Google, Facebook} from 'components/OAuthButtons'
import BlockInput from 'components/BlockInput'
import {column, row, align} from 'lib/layout'
import * as mixins from 'lib/styles/mixins'
import DecoLine from 'components/DecoLine'
import HomeLayout from 'layouts/Home'
import * as colors from 'lib/colors'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Teacher signup page
 */

function render () {
  return (
    <HomeLayout action='login'>
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
        <div class={[column, col_sm, white, align.center_center]}>
          <BlockInput placeholder='FULL NAME' />
          <BlockInput placeholder='EMAIL' />
          <BlockInput placeholder='PASSWORD' type='password' />
          <button class={[btn, wide]}>
            Sign Up Now
          </button>
          <div class={[row, align.spaceAround_center, mrg]}>
            <DecoLine />or<DecoLine />
          </div>
          <span>
            <Google style={{float: 'left', display: 'inline-block'}}>Sign in With Google</Google>
            <Facebook style={{float: 'right', display: 'inline-block'}}>Sign in With Facebook</Facebook>
          </span>
        </div>
      </div>
    </HomeLayout>
  )
}

/**
 * Styles
 */

const {btn} = css({
  btn: {
    ...mixins.btn(colors.green, '#fff'),
    marginTop: 10,
    height: 43,
    lineHeight: '43px',
    width: '100%',
    fontSize: '15px',
    padding: '0 6px 0 33px'
  }
})


/**
 * Exports
 */

export default render
