/**
 * Imports
 */

import TeacherSignup from 'pages/teacher-signup'
import StudentSignup from 'pages/student-signup'
import Feed from 'pages/feed'
import Home from 'pages/home'
import Login from 'pages/login'
import element from 'vdux/element'
import enroute from 'enroute'
import css from 'jss-simple'

/**
 * Enroute
 */

const router = enroute({
  '/': (params, props) => isLoggedIn(props)
    ? <Feed {...props} />
    : <Home {...props} />,
  '/login': (params, props) => <Login {...props} />,
  '/teacher': (params, props) => <TeacherSignup {...props} />,
  '/student': (params, props) => <StudentSignup {...props} />,
  '*': (params, props) => <div>404: Page not found</div>
})

/**
 * Router
 */

function render ({props}) {
  if (! props.url) return <div>Loading...</div>
  return router(props.url, props)
}

/**
 * Helpers
 */

function isLoggedIn (state) {
  return !!state.currentUser
}

/**
 * Exports
 */

export default {
  render
}
