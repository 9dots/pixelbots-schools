/**
 * Imports
 */

import TeacherSignup from 'pages/teacher-signup'
import StudentSignup from 'pages/student-signup'
import Home from 'pages/home'
import Login from 'pages/login'
import element from 'vdux/element'
import enroute from 'enroute'
import css from 'jss-simple'

/**
 * Enroute
 */

const router = enroute({
  '/': props => <Home {...props} />,
  '/login': props => <Login {...props} />,
  '/teacher': props => <TeacherSignup {...props} />,
  '/student': props => <StudentSignup {...props} />,
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
