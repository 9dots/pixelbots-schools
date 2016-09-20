/**
 * Imports
 */

import ActivitiesLayout from 'layouts/ActivitiesLayout'
import ActivityLayout from 'layouts/ActivityLayout'
import SettingsLayout from 'layouts/SettingsLayout'
import ProfileLayout from 'layouts/ProfileLayout'
import SearchLayout from 'layouts/SearchLayout'
import ClassLayout from 'layouts/ClassLayout'
import BoardLayout from 'layouts/BoardLayout'
import HomeLayout from 'layouts/HomeLayout'
import AppLayout from 'layouts/AppLayout'

import SearchMyActivities from 'pages/SearchMyActivities'
import SearchActivities from 'pages/SearchActivities'
import SearchPeople from 'pages/SearchPeople'
import SearchBoards from 'pages/SearchBoards'

import ForgotPassword from 'pages/ForgotPassword'
import TeacherSignup from 'pages/TeacherSignup'
import StudentSignup from 'pages/StudentSignup'
import ResetPassword from 'pages/ResetPassword'
import Clever from 'pages/Clever'

import ProfileFollowers from 'pages/ProfileFollowers'
import ProfileFollowing from 'pages/ProfileFollowing'
import ProfileStream from 'pages/ProfileStream'
import ProfileBoards from 'pages/ProfileBoards'
import ProfileLikes from 'pages/ProfileLikes'

import BoardActivities from 'pages/BoardActivities'
import BoardFollowers from 'pages/BoardFollowers'

import ActivityDiscussion from 'pages/ActivityDiscussion'
import ActivityProgress from 'pages/ActivityProgress'
import ActivityOverview from 'pages/ActivityOverview'
import ActivityInstance from 'pages/ActivityInstance'
import ActivityPreview from 'pages/ActivityPreview'
import ActivityEdit from 'pages/ActivityEdit'

import ClassGradebook from 'pages/ClassGradebook'
import ClassStudents from 'pages/ClassStudents'
import ClassFeed from 'pages/ClassFeed'

import AccountSettings from 'pages/AccountSettings'
import AccountProfile from 'pages/AccountProfile'
import AccountEmail from 'pages/AccountEmail'

import ActivitiesBoard from 'pages/ActivitiesBoard'
import MyActivities from 'pages/MyActivities'
import FeedStudent from 'pages/FeedStudent'
import Drafts from 'pages/Drafts'
import Trash from 'pages/Trash'
import Login from 'pages/Login'
import Feed from 'pages/Feed'
import Home from 'pages/Home'

import NotificationsFeed from 'pages/NotificationsFeed'
import Connect from 'pages/Connect'

import Redirect from 'components/Redirect'
import FourOhFour from 'pages/FourOhFour'
import element from 'vdux/element'
import enroute from 'enroute'

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {page} from 'middleware/analytics'

/**
 * External router
 */

const router = enroute({
  '/': track(
    (params, props) => isLoggedIn(props) ? 'Home Redirect' : 'Home',
    (params, props) => isLoggedIn(props)
      ? <Redirect to='/feed' />
      : <HomeLayout action='login'>
          <Home {...props} />
        </HomeLayout>),

  '/clever(\\?.*)': track('Clever', (params, props) =>
    <HomeLayout action='signup'>
      <Clever {...props} />
    </HomeLayout>),
  '/login': track('Login', (params, props) =>
    <HomeLayout action='signup'>
      <Login {...props} />
    </HomeLayout>),
  '/teacher': track('Teacher Signup', (params, props) =>
    <HomeLayout action='login'>
      <TeacherSignup {...props} />
    </HomeLayout>),
  '/student': track('Student Signup', (params, props) =>
    <HomeLayout action='login'>
      <StudentSignup {...props} />
    </HomeLayout>),
  '/forgot': track('Forgot Password', (params, props) =>
    <HomeLayout action='login'>
      <ForgotPassword {...props} />
    </HomeLayout>),
  '/reset/:token': track('Reset Password', (params, props) =>
    <HomeLayout action='login'>
      <ResetPassword {...props} {...params} />
    </HomeLayout>),

  // Home
  '/feed': track('Feed', auth('user', (params, props) =>
    <AppLayout {...props}>
      {
        isTeacher(props)
          ? <Feed {...props} />
          : <FeedStudent {...props} />
      }
    </AppLayout>)),

  // My Activities
  '/activities': track('Activities Redirect', auth('teacher', (params, props) =>
    <ActivitiesLayout {...props}>
      <Redirect to='/activities/all' />
    </ActivitiesLayout>)),
  '/activities/all': track('My Activities', auth('teacher', (params, props) =>
    <ActivitiesLayout {...props}>
      <MyActivities {...props} />
    </ActivitiesLayout>)),
  '/activities/drafts': track('Drafts', auth('teacher', (params, props) =>
    <ActivitiesLayout {...props}>
      <Drafts {...props} />
    </ActivitiesLayout>)),
  '/activities/trash': track('Trash', auth('teacher', (params, props) =>
    <ActivitiesLayout {...props}>
      <Trash {...props} />
    </ActivitiesLayout>)),
  '/activities/:boardId': track('Activities Board', auth('teacher', (params, props) =>
    <ActivitiesLayout {...props}>
      <ActivitiesBoard {...params} {...props} />
    </ActivitiesLayout>)),

  // Search
  '/search/activities/:query?': track('Search Activities', auth('nonstudent', (params, props) =>
    <SearchLayout {...props} {...params}>
      <SearchActivities {...props} {...params} />
    </SearchLayout>)),
  '/search/my-activities/:query?': track('Search My Activities', auth('nonstudent', (params, props) =>
    <SearchLayout {...props} {...params}>
      <SearchMyActivities {...props} {...params} />
    </SearchLayout>)),
  '/search/boards/:query?': track('Search Boards', auth('nonstudent', (params, props) =>
    <SearchLayout {...props} {...params}>
      <SearchBoards {...props} {...params} />
    </SearchLayout>)),
  '/search/people/:query?': track('Search People', auth('nonstudent', (params, props) =>
    <SearchLayout {...props} {...params}>
      <SearchPeople {...props} {...params} />
    </SearchLayout>)),

  // Class
  '/class/:groupId': track('Class Redirect', auth('user', (params, props) =>
    <ClassLayout {...props} {...params}>
      <Redirect to={`/class/${params.groupId}/feed`} />
    </ClassLayout>)),
  '/class/:groupId/feed': track('Class Feed', auth('user', (params, props) =>
    <ClassLayout {...props} {...params}>
      {group => <ClassFeed {...props} group={group} />}
    </ClassLayout>)),
  '/class/:groupId/students': track('Class Students', auth('user', (params, props) =>
    <ClassLayout {...props} {...params}>
      {group => <ClassStudents {...props} group={group} />}
    </ClassLayout>)),
  '/class/:groupId/gradebook': track('Class Gradebook', auth('user', (params, props) =>
    <ClassLayout {...props} {...params}>
      {group => <ClassGradebook {...props} group={group} />}
    </ClassLayout>)),

  // Acount
  '/account/settings': track('Account Settings', auth('user', (params, props) =>
    <SettingsLayout {...props} {...params}>
      <AccountSettings {...props} />
    </SettingsLayout>)),
  '/account/profile': track('Account Profile', auth('user', (params, props) =>
    <SettingsLayout {...props} {...params}>
      <AccountProfile {...props} />
    </SettingsLayout>)),
  '/account/email': track('Account Email', auth('teacher', (params, props) =>
    <SettingsLayout {...props} {...params}>
      <AccountEmail {...props} />
    </SettingsLayout>)),

  // Notifications
  '/notifications': track('Notifications Feed', auth('user', (params, props) =>
    <AppLayout bgColor='red_medium' {...props} {...params}>
      <NotificationsFeed {...props}/>
    </AppLayout>)),

  // Connect
  '/connect/:userSearch?': track('Connect', auth('teacher', (params, props) =>
    <AppLayout {...props} {...params}>
      <Connect {...props} {...params}/>
    </AppLayout>)),

  // Activity

  '/activity/:activityId': track('Activity Redirect', (params, props) =>
    <ActivityLayout {...props} {...params} redirect>
      {({activity}) => activityRedirect(activity, props)}
    </ActivityLayout>),
  '/activity/:activityId/edit/:intent?': track('Activity Edit', (params, props) =>
    <ActivityLayout isEdit {...props} {...params}>
      {data => <ActivityEdit {...props} {...params} {...data} />}
    </ActivityLayout>),
  '/activity/:activityId/students': track('Activity Progress', (params, props) =>
    <ActivityLayout {...props} {...params}>
      {data => <ActivityProgress {...props} {...params} {...data} />}
    </ActivityLayout>),
  '/activity/:activityId/overview': track('Activity Overview', (params, props) =>
    <ActivityLayout {...props} {...params}>
      {data => <ActivityOverview {...props} {...params} {...data} />}
    </ActivityLayout>),
  '/activity/:activityId/preview': track('Activity Preview', (params, props) =>
    <ActivityLayout {...props} {...params}>
      {data => <ActivityPreview {...props} {...params} {...data} />}
    </ActivityLayout>),
  '/activity/:activityId/discussion': track('Activity Discussion', (params, props) =>
    <ActivityLayout {...props} {...params}>
      {data => <ActivityDiscussion {...props} {...params} {...data} />}
    </ActivityLayout>),
  '/activity/:activityId/instance/:userId': track('Activity Instance', (params, props) =>
    <ActivityLayout {...props} {...params}>
      {data => <ActivityInstance {...props} {...params} {...data} />}
    </ActivityLayout>),

  // Board
  '/:username/board/:boardId/activities': track('Board Activities', auth('nonstudent', (params, props) =>
    <BoardLayout {...props} {...params}>
      {board => <BoardActivities {...props} {...params} board={board} />}
    </BoardLayout>)),
  '/:username/board/:boardId/followers': track('Board Followers', auth('nonstudent', (params, props) =>
    <BoardLayout {...props} {...params}>
      {board => <BoardFollowers {...props} {...params} board={board} />}
    </BoardLayout>)),

  // Profile
  '/:username/boards': track('Profile Boards', auth('nonstudent', (params, props) =>
    <ProfileLayout {...props} {...params}>
      {user => <ProfileBoards {...props} user={user} />}
    </ProfileLayout>)),
  '/:username/likes': track('Profile Likes', auth('nonstudent', (params, props) =>
    <ProfileLayout {...props} {...params}>
      {user => <ProfileLikes {...props} user={user} />}
    </ProfileLayout>)),
  '/:username/following': track('ProfileFollowing', auth('nonstudent', (params, props) =>
    <ProfileLayout {...props} {...params}>
      {user => <ProfileFollowing {...props} user={user} />}
    </ProfileLayout>)),
  '/:username/followers': track('Profile Followers', auth('nonstudent', (params, props) =>
    <ProfileLayout {...props} {...params}>
      {user => <ProfileFollowers {...props} user={user} />}
    </ProfileLayout>)),
  '/:username/stream': track('Profile Stream', (params, props) =>
    <ProfileLayout {...props} {...params}>
      {user => <ProfileStream {...props} user={user} />}
    </ProfileLayout>),
  '/:username': track('Profile Redirect', (params, props) =>
    <ProfileLayout {...props} {...params}>
      { user => profileRedirect(props, user) }
    </ProfileLayout>),

  // 404
  '*': track('404', (params, props) =>
    <AppLayout {...props} {...params}>
      <FourOhFour />
    </AppLayout>)
})

/**
 * onCreate
 */

function * onCreate ({props, state}) {
  const {name, params} = router(props.url, {...props, ...state})
  yield page({name, params})
}

/**
 * Router
 */

function render ({props, state}) {
  if (! props.url || !props.ready) return <div>Loading...</div>
  return router(props.url, {...props, ...state}).route
}

/**
 * Helpers
 */

function auth (type, route) {
  return (params, props) =>
    isAuthorized(type, props)
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

function isAuthorized (type, {currentUser}) {
  switch (type) {
    case 'user':
      return !!currentUser
    case 'student':
      return currentUser.userType === 'student'
    case 'nonstudent':
      return !currentUser || currentUser.userType !== 'student'
    case 'teacher':
      return currentUser.userType === 'teacher'
  }
}

/**
 * onUpdate
 */

const activityRe = /^\/activity\//
const activityEditRe = /^\/activity\/[^\/]+\/edit/

function * onUpdate (prev, next) {
  if (prev.props.url !== next.props.url) {
    const {name, params} = router(next.props.url, {...next.props, ...next.state})
    yield page({name, params})

    if (prev.props.url && !activityRe.test(prev.props.url) && activityRe.test(next.props.url)) {
      yield next.local(canExit)(true)
    }

    if (prev.props.url && activityRe.test(prev.props.url) && activityEditRe.test(next.props.url)) {
      yield next.local(exitDepth)(2)
    }

    if (prev.props.url && activityEditRe.test(prev.props.url) && !activityEditRe.test(next.props.url)) {
      yield next.local(exitDepth)(undefined)
    }

    yield () => document.body.scrollTop = 0
  }
}

/**
 * Actions
 */

const canExit = createAction('<Router/>: canExit')
const exitDepth = createAction('<Router/>: exitDepth')

/**
 * Reducer
 */

const reducer = handleActions({
  [canExit]: (state, canExit) => ({
    ...state,
    canExit
  }),
  [exitDepth]: (state, exitDepth) => ({
    ...state,
    exitDepth
  })
})

/**
 * Helpers
 */

function isTeacher (state) {
  return state.currentUser.userType === 'teacher'
}

function isLoggedIn (state) {
  return !!state.currentUser
}

function profileRedirect (props, user) {
  const {currentUser} = props
  let subState = 'stream'

  if(currentUser.userType !== 'student')
    subState = user.userType === 'student' ? 'stream' : 'boards'

  return <Redirect to={`/${user.username}/${subState}`}/>
}

function activityRedirect ({published, contexts, _id}, {currentUser}) {
  if (!published) {
    return <Redirect to={`/activity/${_id}/edit`} />
  }

  if (contexts[0].descriptor.id === 'public') {
    return <Redirect to={`/activity/${_id}/preview`} />
  }

  if (currentUser.userType === 'student') {
    return <Redirect to={`/activity/${_id}/instance/${currentUser._id}`} />
  }

  return <Redirect to={`/activity/${_id}/students`} />
}

/**
 * Exports
 */

export default {
  onCreate,
  render,
  onUpdate,
  reducer
}
