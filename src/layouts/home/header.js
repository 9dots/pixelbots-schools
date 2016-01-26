/**
 * Imports
 */

import ActionButton from './action-button'
import element from 'vdux/element'
import {align} from 'lib/layout'
import css from 'jss-simple'
import Nav from './nav'

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

const style = css({
  header: {
    zIndex: 1,
    width: '100%',
    padding: '4px 30px',
    position: 'absolute',
    height: '50px',
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
    <div class={style.header}>
      <div class={align.spaceBetween_center}>
        <Nav />
        {button}
      </div>
    </div>
  )
}

/**
 * Exports
 */

export default render
