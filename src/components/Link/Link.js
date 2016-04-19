/**
 * Imports
 */

import {setUrl} from 'redux-effects-location'
import element from 'vdux/element'

/**
 * getProps
 */

function getProps (props, context) {
  props.current = props.current || props.href === context.currentUrl
  return props
}

/**
 * <Link/>
 */

function render ({props, children}) {
  const {ui: Ui = 'a', current, href, currentProps = {}, ...rest} = props
  let onClick

  if (Ui !== 'a') {
    onClick = () => setUrl(href)
  }

  return (
    <Ui {...rest} href={href} onClick={onClick} {...(current ? currentProps : {})}>{children}</Ui>
  )
}

/**
 * Exports
 */

export default {
  getProps,
  render
}
