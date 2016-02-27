/**
 * Imports
 */

import middleware from './middleware'
import element from 'vdux/element'
import App from 'components/app'
import vdux from 'vdux/string'
import reducer from 'reducer/'

/**
 * initialState
 */

const initialState = {
  auth: {},
  user: {}
}

/**
 * Render to string
 */

function render (request) {
  return vdux({
    middleware: middleware(request),
    initialState,
    reducer,
    app: state => <App state={state} />,
    ready: state => state.ready
  })
}

/**
 * Exports
 */

export default render
