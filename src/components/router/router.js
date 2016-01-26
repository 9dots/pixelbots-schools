/**
 * Imports
 */

import Home from 'pages/home'
import enroute from 'enroute'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Enroute
 */

const router = enroute({
  '/': props => <Home {...props} />
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
