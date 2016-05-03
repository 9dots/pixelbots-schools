/**
 * Imports
 */

import ActivitiesLayout from 'layouts/ActivitiesLayout'
import SearchLayout from 'layouts/SearchLayout'
import HomeLayout from 'layouts/Home'
import AppLayout from 'layouts/App'

import SearchMyActivities from 'pages/SearchMyActivities'
import SearchActivities from 'pages/SearchActivities'
import TeacherSignup from 'pages/TeacherSignup'
import StudentSignup from 'pages/StudentSignup'
import MyActivities from 'pages/MyActivities'
import SearchPeople from 'pages/SearchPeople'
import SearchBoards from 'pages/SearchBoards'
import Drafts from 'pages/Drafts'
import Trash from 'pages/Trash'
import Login from 'pages/Login'
import Feed from 'pages/Feed'
import Home from 'pages/Home'

import Redirect from 'components/Redirect'
import element from 'vdux/element'
import enroute from 'enroute'

/**
 * External router
 */

const router = enroute({
  '/': (params, props) => isLoggedIn(props)
    ? <Redirect to='/feed' />
    : <HomeLayout action='login'>
        <Home {...props} />
      </HomeLayout>,
  '/login': (params, props) =>
    <HomeLayout action='signup'>
      <Login {...props} />
    </HomeLayout>,
  '/teacher': (params, props) =>
    <HomeLayout action='login'>
      <TeacherSignup {...props} />
    </HomeLayout>,
  '/student': (params, props) =>
    <HomeLayout action='login'>
      <StudentSignup {...props} />
    </HomeLayout>,

  // Internal
  '*': (params, props) => props.currentUser
    ? internal(props.url, props)
    : <Redirect to='/' />
})

/**
 * Internal app router
 */

const internal = enroute({
  // Home
  '/feed': (params, props) =>
    <AppLayout {...props}>
      <Feed {...props} />
    </AppLayout>,

  // My Activities
  '/activities': (params, props) => <Redirect to='/activities/all' />,
  '/activities/all': (params, props) =>
    <ActivitiesLayout {...props}>
      <MyActivities {...props} />
    </ActivitiesLayout>,
  '/activities/drafts': (params, props) =>
    <ActivitiesLayout {...props}>
      <Drafts {...props} />
    </ActivitiesLayout>,
  '/activities/trash': (params, props) =>
    <ActivitiesLayout {...props}>
      <Trash {...props} />
    </ActivitiesLayout>,

  // Search
  '/search/activities/:query?': (params, props) =>
    <SearchLayout {...props} {...params}>
      <SearchActivities {...props} {...params} />
    </SearchLayout>,
  '/search/my-activities/:query?': (params, props) =>
    <SearchLayout {...props} {...params}>
      <SearchMyActivities {...props} {...params} />
    </SearchLayout>,
  '/search/boards/:query?': (params, props) =>
    <SearchLayout {...props} {...params}>
      <SearchBoards {...props} {...params} />
    </SearchLayout>,
  '/search/people/:query?': (params, props) =>
    <SearchLayout {...props} {...params}>
      <SearchPeople {...props} {...params} />
    </SearchLayout>,

  // 404
  '*': (params, props) => <div>404: Page not found</div>
})

/**
 * Router
 */

function render ({props}) {
  if (! props.url || !props.ready) return <div>Loading...</div>
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
