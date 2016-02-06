/**
 * Imports
 */

import HomeLayout from 'layouts/home'
import Login from 'components/login'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * login
 */

function render ({props}) {
  return (
    <HomeLayout action='signup'>
      <Login />
    </HomeLayout>
  )
}

/**
 * Exports
 */

export default {
  render
}
