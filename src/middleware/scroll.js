/**
 * Imports
 */

import animate from '@f/animate'
import createAction from '@f/create-action'

/**
 * Action types
 */

const SCROLL_TO = 'SCROLL_TO'

/**
 * Scroll middleware
 */

function middleware () {
  return next => action =>
    action.type === SCROLL_TO
      ? scrollToElement(action.payload)
      : next(action)
}

/**
 * Helpers
 */

function scrollToElement ({element, duration, easing}) {
  element = asElement(element)

  const {left, top} = element.getBoundingClientRect()
  const start = {
    left: window.pageXOffset,
    top: window.pageYOffset
  }

  const end = {
    left: start.left + left,
    top: start.top + top
  }

  animate(start, end, props => {
    window.scrollTo(props.left, props.top)
  }, duration, easing)
}

function asElement (element) {
  return 'string' === typeof element
    ? document.querySelector(element)
    : element
}

/**
 * Action creators
 */

const scrollTo = createAction(
  SCROLL_TO,
  (element, opts) => ({
    element,
    ...opts
  })
)

/**
 * Exports
 */

export default middleware
export {
  scrollTo
}
