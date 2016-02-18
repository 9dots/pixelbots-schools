/**
 * Imports
 */

import {white, mrg, mrg_top, pad_top, mrg_right, mrg_left} from 'lib/styles'
import {row, flex, flex_35, align} from 'lib/layout'
import * as constants from 'lib/styles/constants'
import {setUrl} from 'redux-effects-location'
import * as mixins from 'lib/styles/mixins'
import HomeLayout from 'layouts/home'
import * as colors from 'lib/colors'
import element from 'vdux/element'
import Content from './content'
import css from 'jss-simple'

/**
 * Home Page
 */

function render ({props}) {
  return (
    <HomeLayout action='login'>
      <div class={[one_col, row, align.center_center, white]}>
        <div>
          <Content />
          <span class={[mrg_top, pad_top, row, align.center_center]}>
            <button class={[btn, mrg_right, flex_35]} onClick={e => setUrl('/teacher')}>
              Teachers, Sign Up
            </button>
            <button id='students' class={[btn, btn_primary, mrg_left, flex_35]} onClick={e => setUrl('/student')}>
              Students, Join Class
            </button>
          </span>
        </div>
      </div>
    </HomeLayout>
  )
}

/**
 * Styles
 */

const {one_col, btn, btn_primary} = css({
  one_col: {
    maxWidth: 714,
    textAlign: 'center'
  },
  btn: {
    ...mixins.btn(colors.green, '#FFF'),
    height: '47px',
    lineHeight: '47px',
    fontSize: '14px',
    fontWeight: 'bolder',
    margin: '6px ' + constants.spacing,
    borderRadius: '50px'
  },
  btn_primary: {
    backgroundColor: '#25a8e0'
  }
})

/**
 * Exports
 */

export default {
  render
}
