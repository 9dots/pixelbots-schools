/**
 * Imports
 */

import element from 'vdux/element'
import {gplusIcon} from 'lib/assets'
import OAuthButton from './btn'
import css from 'jss-simple'

/**
 * Google OAuth Button
 */

function render ({props, children}) {
  return (
    <OAuthButton {...props} class={[props.class, google]}>
      {children}
    </OAuthButton>
  )
}

/**
 * Style
 */

const {google} = css({
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
  }
})

/**
 * Exports
 */

export default render
