/**
 * Imports
 */

import Home from 'pages/home'
import Login from 'pages/login'
import enroute from 'enroute'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Enroute
 */

const router = enroute({
  '/': props => <Home {...props} />,
  '/login': props => <Login {...props} />,
  '*': props => <div>404: Page not found</div>
})

/**
 * router
 */

function render ({props}) {
  if (! props.url) return <div>Loading...</div>
  return router(props.url, props)
}

/**
 * Exports
 */

export default {
  render
}
