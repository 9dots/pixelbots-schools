/**
 * Imports
 */

import TeacherSignup from 'pages/TeacherSignup'
import StudentSignup from 'pages/StudentSignup'
import MyActivities from 'pages/MyActivities'
import element from 'vdux/element'
import Drafts from 'pages/Drafts'
import Login from 'pages/Login'
import Feed from 'pages/Feed'
import Home from 'pages/Home'
import enroute from 'enroute'

/**
 * Enroute
 */

const router = enroute({
  '/': (params, props) => isLoggedIn(props)
    ? <Feed {...props} />
    : <Home {...props} />,
  '/login': (params, props) => <Login {...props} />,
  '/activities/all': (params, props) => <MyActivities {...props} />,
  '/activities/drafts': (params, props) => <Drafts {...props} />,
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
