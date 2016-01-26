/**
 * Imports
 */

import HomeLayout from 'layouts/home'
import Home from 'components/home'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * home
 */

function render ({props}) {
  return (
    <HomeLayout>
      <Home />
    </HomeLayout>
  )
}

/**
 * Exports
 */

export default {
  render
}
