/**
 * Imports
 */

import SettingsLayout from 'layouts/SettingsLayout'
import ActivityLayout from 'layouts/ActivityLayout'
import ClassLayout from 'layouts/ClassLayout'
import MainLayout from 'layouts/MainLayout'
import HomeLayout from 'layouts/HomeLayout'
import AppLayout from 'layouts/AppLayout'

import SchoolDiscussion from 'pages/SchoolDiscussion'
import SchoolTeachers from 'pages/SchoolTeachers'
import SchoolStudents from 'pages/SchoolStudents'
import SchoolSettings from 'pages/SchoolSettings'
import SchoolStream from 'pages/SchoolStream'

import ClassGradebook from 'pages/ClassGradebook'
import ClassStudents from 'pages/ClassStudents'
import ClassFeed from 'pages/ClassFeed'

import AccountSettings from 'pages/AccountSettings'
import AccountProfile from 'pages/AccountProfile'
import AccountEmail from 'pages/AccountEmail'

import AllClasses from 'pages/AllClasses'
import Login from 'pages/Login'
import Feed from 'pages/Feed'

import ActivityProgress from 'pages/ActivityProgress'
import StudentProgress from 'pages/StudentProgress'
import Redirect from 'components/Redirect'
import FourOhFour from 'pages/FourOhFour'
import {component, element} from 'vdux'
import enroute from 'enroute'

/**
 * External router
 */

const router = enroute({
  '/': track('Login', (params, props) =>
    <HomeLayout title='Login - Weo'>
      {
        props.userId
          ? <Redirect to='/class/all/' />
          : <Login {...props} />
      }
    </HomeLayout>),

  // Home
  '/feed': track('Feed', auth((params, props) =>
    <MainLayout {...props}>
      <Feed {...props} />
    </MainLayout>)),

  // School
  '/school/': track('School Redirect', auth((params, props) =>
    <Redirect to='/school/discussion' />)),
  '/school/discussion': track('School Discussion', auth((params, props) =>
    <SchoolLayout {...props} {...params}>
      <SchoolDiscussion {...props} {...params} />
    </SchoolLayout>)),
  '/school/teachers': track('School Teachers', auth((params, props) =>
    <SchoolLayout {...props} {...params}>
      <SchoolTeachers {...props} {...params} />
    </SchoolLayout>)),
  '/school/students': track('School Students', auth((params, props) =>
    <SchoolLayout {...props} {...params}>
      <SchoolStudents {...props} {...params} />
    </SchoolLayout>)),
  '/school/stream': track('School Stream', auth((params, props) =>
    <SchoolLayout {...props} {...params}>
      <SchoolStream {...props} {...params} />
    </SchoolLayout>)),
  '/school/settings': track('School Settings', auth((params, props) =>
    <SchoolLayout {...props} {...params}>
        <SchoolSettings {...props} {...params} />
    </SchoolLayout>)),

  // Class
  '/class/': track('Class Redirect', auth((params, props) =>
    <Redirect to='/class/all' />)),
  '/class/all': track('Class All', auth((params, props) =>
    <MainLayout {...props} {...params}>
      <AllClasses {...props} />
    </MainLayout>)),
  '/class/:groupId': track('Class Feed Redirect', auth((params, props) =>
    <MainLayout {...props} {...params}>
      <ClassLayout {...props} {...params}>
        <Redirect to={`/class/${params.groupId}/feed`} />
      </ClassLayout>
    </MainLayout>)),
  '/class/:groupId/feed': track('Class Feed', auth((params, props) =>
    <MainLayout {...props} {...params}>
      <ClassLayout {...props} {...params}>
        {group => <ClassFeed {...props} group={group} {...params} />}
      </ClassLayout>
    </MainLayout>)),
  '/class/:groupId/students': track('Class Students', auth((params, props) =>
    <MainLayout {...props} {...params}>
      <ClassLayout {...props} {...params}>
        {group => <ClassStudents {...props} {...params} group={group} />}
      </ClassLayout>
    </MainLayout>)),
  '/class/:groupId/gradebook': track('Class Gradebook', auth((params, props) =>
    <MainLayout {...props} {...params}>
      <ClassLayout {...props} {...params}>
        {group => <ClassGradebook {...props} group={group} />}
      </ClassLayout>
    </MainLayout>)),

  '/activity/:classRef/:playlistRef': track('Activity', auth((params, props) =>
    <AppLayout {...props}>
      <ActivityLayout {...props} {...params}>
        {
          (extra = {}) => <ActivityProgress {...props} {...params} {...extra} />
        }
      </ActivityLayout>
    </AppLayout>
  )),
  '/activity/:classRef/:playlistRef/:studentId': track('Activity', auth((params, props) =>
    <AppLayout {...props}>
      <ActivityLayout {...props} {...params}>
        {
          (extra = {}) => <StudentProgress {...props} {...params} {...extra} />
        }
      </ActivityLayout>
    </AppLayout>
  )),

  // Account
  '/account/settings': track('Account Settings', auth((params, props) =>
    <SettingsLayout {...props} {...params}>
      <AccountSettings {...props} />
    </SettingsLayout>)),
  '/account/profile': track('Account Profile', auth((params, props) =>
    <SettingsLayout {...props} {...params}>
      <AccountProfile {...props} />
    </SettingsLayout>)),
  '/account/email': track('Account Email', auth((params, props) =>
    <SettingsLayout {...props} {...params}>
      <AccountEmail {...props} />
    </SettingsLayout>)),

  // Student Sign In
  '/schools/:schoolId': track('Student Log In', auth((params, props) => 
    <HomeLayout {...props} {...params}>
      <StudentSignIn {...props} {...params}/>
    </HomeLayout>
  )),
  '/schools/:schoolId/:classId': track('Student Log In: Class', auth((params, props) => 
    <HomeLayout {...props} {...params}>
      <StudentSignIn {...props} {...params}/>
    </HomeLayout>
  )),

  // 404
  '*': track('404', (params, props) =>
    <AppLayout {...props} {...params}>
      <FourOhFour />
    </AppLayout>)
})

/**
 * URL Regexes
 */

const activityRe = /^\/activity\//
const activityEditRe = /^\/activity\/[^\/]+\/edit/

/**
 * <Router/>
 */

export default component({
  onCreate ({props, state, context}) {
    const {name, params} = router(props.currentUrl, {...props, ...state})
    return context.page({name, params})
  },

  render ({props, state}) {
    if (!props.currentUrl || !props.ready) return <div>Loading...</div>
    return router(props.currentUrl, {...props, ...state}).route
  },

  reducer: {
    canExit: (state, canExit) => ({canExit}),
    exitDepth: (state, exitDepth) => ({exitDepth})
  },

  * onUpdate (prev, next) {
    const {actions, context} = next

    if (prev.props.currentUrl !== next.props.currentUrl) {
      const {name, params} = router(next.props.currentUrl, {...next.props, ...next.state})
      yield context.page({name, params})

      if (prev.props.currentUrl && !activityRe.test(prev.props.currentUrl) && activityRe.test(next.props.currentUrl)) {
        yield actions.canExit(true)
      }

      if (prev.props.currentUrl && activityRe.test(prev.props.currentUrl) && activityEditRe.test(next.props.currentUrl)) {
        yield actions.exitDepth(2)
      }

      if (prev.props.currentUrl && activityEditRe.test(prev.props.currentUrl) && !activityEditRe.test(next.props.currentUrl)) {
        yield actions.exitDepth(undefined)
      }

      yield () => (document.body.scrollTop = 0)
    }
  }
})

/**
 * Helpers
 */

function auth (route) {
  return (params, props) =>
    isAuthorized(props)
      ? route(params, props)
      : <Redirect to='/' />
}

function track (name, route) {
  return (params, props) => ({
    name: typeof name === 'function' ? name(params, props) : name,
    params,
    props,
    route: route(params, props)
  })
}

function isAuthorized ({currentUser}) {
  return !!currentUser
}

function hasSchool ({currentUser}) {
  return !!currentUser.schools
}

function isLoggedIn (state) {
  return !!(state.currentUser && state.currentUser.username)
}

function profileRedirect (props, user) {
  const {currentUser} = props
  let subState = 'stream'

  if (currentUser.userType !== 'student') {
    subState = user.userType === 'student' ? 'stream' : 'boards'
  }

  return <Redirect to={`/${user.username}/${subState}`} />
}

function activityRedirect ({published, contexts, _id}, {currentUser}) {
  if (!published) {
    return <Redirect to={`/activity/${_id}/edit`} />
  }

  if (contexts[0].descriptor.id === 'public') {
    if (currentUser.userType === 'student') {
      return <Redirect to='/' />
    } else {
      return <Redirect to={`/activity/${_id}/preview`} />
    }
  }

  if (currentUser.userType === 'student') {
    return <Redirect to={`/activity/${_id}/instance/${currentUser._id}`} />
  }

  return <Redirect to={`/activity/${_id}/students`} />
}
