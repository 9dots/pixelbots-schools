/**
 * Imports
 */

import PageTitle from 'components/PageTitle'
import FourOhFour from 'pages/FourOhFour'
import maybeOver from '@f/maybe-over'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'
import Nav from  './Nav'

/**
 * Activity Layout
 */

function render ({props, children}) {
  return (
    <Block class='app'>
      { internal(props, children) }
    </Block>
  )
}

function internal(props, children) {
  const {activity, students, currentUser, userId, instance} = props
  const {value, loading, error} = activity
  const {value: studentList, loading: sLoading, error: sError} = students
  const {value: instActivity, loading: iLoading, error: iError} = instance
  const isInstance = !!userId

  if(isInstance) {
    if (instance.loading) return ''
    if (instance.error) return <FourOhFour />
  }

  if (loading || sLoading) return ''
  if (error || sError) return <FourOhFour />

  const classId = value.contexts[0].descriptor.id
  const {shareType, discussion} = value
  const isPublic = classId === 'public'

  let navItems = {}
  if(currentUser.userType === 'teacher')
    navItems = {
      progress:  !isInstance && !isPublic,
      overview:  !isInstance && !isPublic,
      preview:  !isInstance || discussion,
      discussion:  !isInstance && (discussion || isPublic)
    }
  else
    navItems = {instance:  discussion, discussion:  discussion}

  return [
    <Nav activity={value} user={currentUser} isPublic={isPublic} {...navItems} />,
    <PageTitle title={`${value.displayName}`} />,
    maybeOver({activity: isInstance ? instance.value : value, students: studentList.items, classId}, children)
  ]
}

/**
 * Exports
 */

export default summon(({userId, activityId, classId}) => ({
  activity: `/share/${activityId}`,
  instance: userId
    ? `/share/${activityId}/instance/${userId}`
    : null
}))(summon(({activity}) => ({
  students: activity.value
    ? `/group/students?group=${activity.value.contexts[0].descriptor.id}`
    : null
}))({
  render
}))
