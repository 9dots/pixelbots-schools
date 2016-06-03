/**
 * Types
 */

const SET_TITLE = 'Set Page Title'

/**
 * Actions
 */

function setTitle (title) {
  return {
    type: SET_TITLE,
    payload: title
  }
}

/**
 * Middleware
 */

function middleware (effect = runSetTitle) {
  return () => next => action => {
    switch (action.type) {
      case SET_TITLE:
        effect(action.payload)
        break
      default:
        return next(action)
    }
  }
}

/**
 * Effects
 */

function runSetTitle (title) {
  document.head.querySelector('title').innerHTML = title
}

/**
 * Exports
 */

export default middleware
export {
  setTitle
}
