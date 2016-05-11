/**
 * Imports
 */

import {setUrl} from 'redux-effects-location'
import {CSSContainer} from 'vdux-containers'
import element from 'vdux/element'
import {Base} from 'vdux-ui'

/**
 * getProps
 */

function getProps (props, context) {
  props.current = props.current || isCurrent(props.href, context.currentUrl)
  return props
}

/**
 * <Link/>
 */

function render ({props, children}) {
  const {ui = InternalLink, current, href, currentProps = {}, ...rest} = props
  let onClick = props.onClick

  if (ui !== InternalLink && href) {
    onClick = () => setUrl(href)
  }

  return (
    <CSSContainer
      ui={ui}
      {...rest}
      href={href}
      onClick={onClick}
      {...(current ? currentProps : {})}>
      {children}
    </CSSContainer>
  )
}

function InternalLink ({props, children}) {
  return (
    <Base tag='a' {...props}>
      {children}
    </Base>
  )
}

/**
 * isCurrent
 *
 * Check whether the route matches the current url
 */

function isCurrent (href = '', currentUrl = '') {
  return href && currentUrl.indexOf(href) === 0
}

/**
 * Exports
 */

export default {
  getProps,
  render
}
