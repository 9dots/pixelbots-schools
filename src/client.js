/**
 * Imports
 */

import domready from '@f/domready'
import element from 'vdux/element'
import middleware from 'middleware'
import * as jss from 'jss-simple'
import vendorPrefixer from 'jss-vendor-prefixer'
import camelCase from 'jss-camel-case'
import defaultUnits from 'jss-default-unit'
import nested from 'jss-nested'
import reducer from './reducer'
import vdux from 'vdux/dom'

/**
 * Setup jss
 */

jss
  .use(camelCase())
  .use(nested())
  .use(vendorPrefixer())
  .use(defaultUnits())

/**
 * Initialize app
 */

let hmr
let App = require('./components/app').default
domready(() => hmr = vdux({
  middleware,
  reducer,
  initialState: window.__initialState__,
  prerendered: true,
  app
}))

jss.attach()

/**
 * Hot module replacement
 */

if (module.hot) {
  module.hot.decline()
  module.hot.accept(['./components/app', './reducer'], () => {
    jss.detach()
    App = require('./components/app').default
    hmr.replace(app, require('./reducer').default)
    jss.attach()
  })
}


function app (state) {
  return <App state={state} />
}
