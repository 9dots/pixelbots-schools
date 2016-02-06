/**
 * Imports
 */

import {wide, col_sm, pad, mrg, white, link, grey_light, center} from 'lib/styles'
import {gplusIcon, fbIcon} from 'lib/assets'
import {row, align} from 'lib/layout'
import BlockInput from 'components/block-input'
import DecoLine from 'components/deco-line'
import * as mixins from 'lib/styles/mixins'
import * as colors from 'lib/colors'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Login
 */

function render () {
  return (
    <div class={[col_sm, pad, white]}>
      <BlockInput class={[wide, mrg]} placeholder='USERNAME OR EMAIL'  />
      <BlockInput class={[wide, mrg]} placeholder='PASSWORD' type='password' />
      <button class={[btn, wide]}>Log In</button>
      <div class={[row, align.spaceAround_center, mrg]}>
        <DecoLine />or<DecoLine />
      </div>
      <div class={[row, align.spaceAround_center]}>
        <button class={[btn, oauth, google]}>
          Sign in with Google
        </button>
        <button class={[btn, oauth, facebook]}>
          Sign in with Facebook
        </button>
      </div>
      <a href='/forgot' class={[grey_light, center, link]}>Forgot your password?</a>
    </div>
  )
}

/**
 * Styles
 */

const {btn, oauth, google, facebook} = css({
  btn: {
    ...mixins.btn(colors.green, '#fff'),
    marginTop: 10,
    height: 43,
    lineHeight: '43px',
    width: '100%',
    fontSize: '15px'
  },
  oauth: {
    padding: '0 25px',
    marginBottom: 0,
    fontSize: '13px',
    lineHeight: '2.1em',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    borderRadius: '3px',
    whiteSpace: 'nowrap',
    outline: 0,
    border: 0,
    lineHeight: '41px !important',
    position: 'relative',
    fontSize: '12px !important',
    float: 'left',
    width: 'calc(50% - 6px) !important',
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 33,
      height: '100%',
      borderLeft: '1px solid rgba(52,52,52,0.08)'
    }
  },
  google: {
    marginLeft: 0,
    backgroundSize: 25,
    backgroundPosition: 'left 4px center',
    backgroundImage: `url('${gplusIcon}')`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#dd4b39',
    display: 'inline-block',
    color: 'rgba(255, 255, 255, 0.85)',
    padding: '0 6px 0 33px'
  },
  facebook: {
    marginRight: 0,
    display: 'inline-block',
    padding: '0 6px 0 33px',
    color: 'rgba(255,255,255,0.85)',
    backgroundSize: 18,
    backgroundColor: '#3b5998',
    backgroundImage: `url(${fbIcon})`,
    backgroundPosition: 'left 8px center',
    backgroundRepeat: 'no-repeat'
  }
})

/**
 * Exports
 */

export default {
  render
}
