/**
 * Imports
 */

import ActivitiesLayout from 'layouts/ActivitiesLayout'
import SettingsLayout from 'layouts/SettingsLayout'
import ProfileLayout from 'layouts/ProfileLayout'
import ClassLayout from 'layouts/ClassLayout'
import SearchLayout from 'layouts/SearchLayout'
import HomeLayout from 'layouts/HomeLayout'
import AppLayout from 'layouts/AppLayout'
import BoardLayout from 'layouts/BoardLayout'

import SearchMyActivities from 'pages/SearchMyActivities'
import SearchActivities from 'pages/SearchActivities'
import SearchPeople from 'pages/SearchPeople'
import SearchBoards from 'pages/SearchBoards'

import TeacherSignup from 'pages/TeacherSignup'
import StudentSignup from 'pages/StudentSignup'
import ForgotPassword from 'pages/ForgotPassword'
import ResetPassword from 'pages/ResetPassword'

import ProfileBoards from 'pages/ProfileBoards'
import ProfileLikes from 'pages/ProfileLikes'
import ProfileFollowers from 'pages/ProfileFollowers'
import ProfileFollowing from 'pages/ProfileFollowing'
import ProfileStream from 'pages/ProfileStream'

import BoardActivities from 'pages/BoardActivities'
import BoardFollowers from 'pages/BoardFollowers'

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

import FourOhFour from 'pages/FourOhFour'
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
  '/forgot': (params, props) =>
    <HomeLayout action='login'>
      <ForgotPassword {...props} />
    </HomeLayout>,
  '/reset/:token': (params, props) =>
    <HomeLayout action='login'>
      <ResetPassword {...props} {...params} />
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
      {
        isTeacher(props)
          ? <Feed {...props} />
          : <FeedStudent {...props} />
      }
    </AppLayout>,

  // My Activities
  '/activities': (params, props) =>
    <ActivitiesLayout {...props}>
      <Redirect to='/activities/all' />
    </ActivitiesLayout>,
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
  '/activities/:boardId': (params, props) =>
    <ActivitiesLayout {...props}>
      <ActivitiesBoard {...params} {...props} />
    </ActivitiesLayout>,

  // Search
  '/search/activities/:query?': auth('nonstudent', (params, props) =>
    <SearchLayout {...props} {...params}>
      <SearchActivities {...props} {...params} />
    </SearchLayout>),
  '/search/my-activities/:query?': auth('nonstudent', (params, props) =>
    <SearchLayout {...props} {...params}>
      <SearchMyActivities {...props} {...params} />
    </SearchLayout>),
  '/search/boards/:query?': auth('nonstudent', (params, props) =>
    <SearchLayout {...props} {...params}>
      <SearchBoards {...props} {...params} />
    </SearchLayout>),
  '/search/people/:query?': auth('nonstudent', (params, props) =>
    <SearchLayout {...props} {...params}>
      <SearchPeople {...props} {...params} />
    </SearchLayout>),

  // Class
  '/class/:groupId': (params, props) =>
    <ClassLayout {...props} {...params}>
      <Redirect to={`/class/${params.groupId}/feed`} />
    </ClassLayout>,
  '/class/:groupId/feed': (params, props) =>
    <ClassLayout {...props} {...params}>
      {group => <ClassFeed {...props} group={group} />}
    </ClassLayout>,
  '/class/:groupId/students': (params, props) =>
    <ClassLayout {...props} {...params}>
      {group => <ClassStudents {...props} group={group} />}
    </ClassLayout>,
  '/class/:groupId/gradebook': (params, props) =>
    <ClassLayout {...props} {...params}>
      {group => <ClassGradebook {...props} group={group} />}
    </ClassLayout>,

  // Acount
  '/account/settings': (params, props) =>
    <SettingsLayout {...props} {...params}>
      <AccountSettings {...props} />
    </SettingsLayout>,
  '/account/profile': (params, props) =>
    <SettingsLayout {...props} {...params}>
      <AccountProfile {...props} />
    </SettingsLayout>,
  '/account/email': auth('teacher', (params, props) =>
    <SettingsLayout {...props} {...params}>
      <AccountEmail {...props} />
    </SettingsLayout>),

  // Notifications
  '/notifications': (params, props) =>
    <AppLayout bgColor='red_medium' {...props} {...params}>
      <NotificationsFeed {...props}/>
    </AppLayout>,

  // Connect
  '/connect/:userSearch?': auth('teacher', (params, props) =>
    <AppLayout {...props} {...params}>
      <Connect {...props} {...params}/>
    </AppLayout>),

  //Board
  '/:username/board/:boardId/activities': (params, props) =>
    <BoardLayout {...props} {...params}>
      {board => <BoardActivities {...props} {...params} board={board} />}
    </BoardLayout>,
  '/:username/board/:boardId/followers': (params, props) =>
    <BoardLayout {...props} {...params}>
      {board => <BoardFollowers {...props} {...params} board={board} />}
    </BoardLayout>,

  // Profile
  '/:username/boards': auth('nonstudent', (params, props) =>
    <ProfileLayout {...props} {...params}>
      {user => <ProfileBoards {...props} user={user} />}
    </ProfileLayout>),
  '/:username/likes': auth('nonstudent', (params, props) =>
    <ProfileLayout {...props} {...params}>
      {user => <ProfileLikes {...props} user={user} />}
    </ProfileLayout>),
  '/:username/following': auth('nonstudent', (params, props) =>
    <ProfileLayout {...props} {...params}>
      {user => <ProfileFollowing {...props} user={user} />}
    </ProfileLayout>),
  '/:username/followers': auth('nonstudent', (params, props) =>
    <ProfileLayout {...props} {...params}>
      {user => <ProfileFollowers {...props} user={user} />}
    </ProfileLayout>),
  '/:username/stream': (params, props) =>
    <ProfileLayout {...props} {...params}>
      {user => <ProfileStream {...props} user={user} />}
    </ProfileLayout>,
  '/:username': (params, props) =>
    <ProfileLayout {...props} {...params}>
      { user => profileRedirect(props, user) }
    </ProfileLayout>,

  // 404
  '*': (params, props) =>
    <AppLayout {...props} {...params}>
      <FourOhFour />
    </AppLayout>
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

function auth (type, route) {
  return (params, props) =>
    isAuthorized(type, props)
      ? route(params, props)
      : <Redirect to='/' />
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

function isTeacher (state) {
  return state.currentUser.userType === 'teacher'
}

function isLoggedIn (state) {
  return !!state.currentUser
}

function profileRedirect (props, user) {
  const {currentUser} = props
  let subState = 'stream'

  if(currentUser.userType === 'teacher')
    subState = user.userType === 'teacher' ? 'boards' : 'stream'

  return <Redirect to={`/${user.username}/${subState}`}/>
}

/**
 * Exports
 */

export default {
  render
}
