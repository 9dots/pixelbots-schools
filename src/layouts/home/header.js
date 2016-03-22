/**
 * Imports
 */

import {medium, mrg_left, off_white, bold} from 'lib/styles'
import {align, row, flex} from 'lib/layout'
import ActionButton from './ActionButton'
import element from 'vdux/element'
import css from 'jss-simple'
import Nav from './Nav'

/**
 * Constants
 */

const buttons = {
  login: <ActionButton link='/login/'>LOG IN</ActionButton>,
  signup: <ActionButton link='/'>SIGN UP</ActionButton>
}

/**
 * Style
 */

const {header} = css({
  header: {
    zIndex: 1,
    width: '100%',
    padding: '4px 30px',
    position: 'absolute',
    height: '53px',
    background: 'rgba(255, 255, 255, 0.2)',
    flex: '1'
  }
})

/**
 * Home Header
 */

function render ({props}) {
  const {action} = props
  const button = buttons[action]

  return (
    <header class={[header, row, align.start_center]}>
      <Nav />
      <a href='/' class={[medium, mrg_left, off_white, bold]} style={{letterSpacing: 1}}>
        WEO
      </a>
      <div class={[row, flex, align.end_center]}>
        {button}
      </div>
    </header>
  )
}

/**
 * Exports
 */

export default render
