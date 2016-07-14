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
  const {value, loaded, error} = activity
  const isInstance = !!userId

  if (!loaded || !students.loaded || (isInstance && !instance.loaded))
    return ''
  if (error || students.error ||  (isInstance && instance.error))
    return <FourOhFour />

  const classId = value.contexts[0].descriptor.id
  const {shareType, discussion} = value
  const isPublic = classId === 'public'
  const isClass = !isInstance && !isPublic

  let nav = {}
  if(currentUser.userType === 'teacher')
    nav = {
      discussion:  (isClass && discussion) || isPublic,
      preview:  !isInstance || discussion,
      progress:  isClass,
      overview:  isClass
    }
  else
    nav = {instance:  discussion, discussion:  discussion}

  return [
    <Nav activity={value} isInstance={isInstance} user={currentUser} isPublic={isPublic} {...nav} />,
    <PageTitle title={`${value.displayName}`} />,
    maybeOver({
      activity: isInstance ? instance.value : value,
      students: students.value.items, classId
    }, children)
  ]
}

/**
 * Exports
 */

export default summon(({userId, activityId}) => ({
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