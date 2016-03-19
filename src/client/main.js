/**
 * Imports
 */

import middleware from './middleware'
import domready from '@f/domready'
import element from 'vdux/element'
import App from 'components/app'
import theme from 'lib/theme'
import reducer from 'reducer'
import vdux from 'vdux/dom'
import jss from './jss'

/**
 * Pre-rendered constants
 */

const prerendered = !! window.__initialState__
const initialState = window.__initialState__ || {}

/**
 * Initialize app
 */

const {subscribe, render, replaceReducer, getState} = vdux({
  middleware,
  reducer,
  initialState,
  prerendered
})

jss.attach()

/**
 * Render loop
 */

domready(() => subscribe(app))

function app (state, forceUpdate) {
  render(<App state={state} />, {uiTheme: theme}, forceUpdate)
}

/**
 * Hot module replacement
 */

if (module.hot) {
  module.hot.decline()
  module.hot.unaccepted(() => window.location.reload())
  module.hot.accept(['components/app', 'reducer'], () => {
    jss.detach()
    require('components/app')
    replaceReducer(require('reducer').default)
    jss.attach()
    app(getState(), true)
  })
}
