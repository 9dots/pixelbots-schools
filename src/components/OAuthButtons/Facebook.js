/**
 * Imports
 */

import {LogoButton} from 'vdux-ui'
import element from 'vdux/element'
import {fbIcon} from 'lib/assets'
import OAuthButton from './Btn'
import css from 'jss-simple'

/**
 * Facebook OAuth Button
 */

function render ({props, children}) {
  return (
    <LogoButton fs='12px' logo={fbIcon} logoSize='18px' pl='8px' bgColor='facebook_blue'>
      {children}
    </LogoButton>
  )
}

/**
 * Style
 */

const {facebook} = css({
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
