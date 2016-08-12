/**
 * Imports
 */

import DiscardDraftModal from 'modals/DiscardDraftModal'
import {back, setUrl} from 'redux-effects-location'
import PageTitle from 'components/PageTitle'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import FourOhFour from 'pages/FourOhFour'
import {openModal} from 'reducer/modal'
import {invalidate} from 'vdux-summon'
import maybeOver from '@f/maybe-over'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'
import Nav from  './Nav'

/**
 * Activity Layout
 */

function render ({props, children, local, state}) {
  return (
    <Block class='app' pb='60vh'>
      { internal(props, children, local, state) }
    </Block>
  )
}

function internal (props, children, local, state) {
  const {activity, students, instances, settingStatus, currentUser, userId, instance, setStatus, isEdit, isNew
  } = props
  const {value, loaded, error} = activity
  const isInstance = !!userId

  if (!loaded || !students.loaded || !instances.loaded || (isInstance && !instance.value)) {
    return ''
  }

  if (error || students.error ||  (isInstance && instance.error)) {
    return <FourOhFour />
  }

  const classId = value.contexts[0].descriptor.id
  const {shareType, discussion} = value
  const isPublic = classId === 'public'
  const isClass = !isInstance && !isPublic
  const isOwner = currentUser._id === value.actor.id

  const nav = currentUser.userType === 'student'
    ? {instance: discussion, discussion}
    : {
      progress: isClass,
      overview: isClass,
      preview: !isInstance,
      discussion: (isClass && discussion) || isPublic
    }

  return [
    <Nav activity={value} isInstance={isInstance} savingIndicator={state.savingIndicator} user={currentUser} isPublic={isPublic} isEdit={isEdit} back={backBtn} isOwner={isOwner} {...nav} />,
    <PageTitle title={`${value.displayName}`} />,
    maybeOver({
      activity: value,
      instance: instance.value,
      students: students.value.items, classId,
      instances: instances.value.items,
      savingIndicator: state.savingIndicator,
      setIndicator: local(setIndicator),
      speech: {
        setSpeaking: local(setSpeaking),
        speakingId: state.speakingId,
        rate: currentUser.preferences.speech_speed || 1
      },
      setStatus,
      settingStatus
    }, children)
  ]

  function backBtn () {
    const {canExit} = props

    if(isNew) {
      return openModal(() => <DiscardDraftModal onAccept={() =>canExit ? back() : setUrl('/feed')} activity={value} />)
    } else {
      return canExit ? back() : setUrl(escapeUrl())
    }
  }

  function escapeUrl () {
    return value.contexts[0].descriptor.id !== 'public'
      ? '/class/' + value.contexts[0].descriptor.id
      : value.actor.id === currentUser._id
        ? '/activities/' + value.contexts[1].descriptor.id
        : `/${value.actor.username}/board/${value.contexts[1].descriptor.id}/activities`
  }
}

/**
 * Actions
 */

const setSpeaking = createAction('<ActivityLayout/>: set speaking')
const setIndicator = createAction('<ActivityLayout/>: set indicator')

/**
 * Reducer
 */

const reducer = handleActions({
  [setSpeaking]: (state, speakingId) => ({
    ...state,
    speakingId
  }),
  [setIndicator]: (state, savingIndicator) => ({
    ...state,
    savingIndicator
  })
})

/**
 * Exports
 */

export default summon(({userId, activityId}) => ({
  activity: `/share/${activityId}`,
  instance: {
    url: userId
      ? `/share/${activityId}/instance/${userId}`
      : null,
    clear: false
  }
}))(summon(({activity, activityId}) => ({
  setStatus: (id, status) => ({
    settingStatus: {
      url: `/instance/${id}/${status}`,
      invalidates: [`/share/${activityId}`, 'instances'],
      method: 'PUT'
    }
  }),
  students: activity.value
    ? `/group/students?group=${activity.value.contexts[0].descriptor.id}`
    : null,
  instances: {
    url: activity.value
      ? `/share?channel=share!${activity.value._id}.instances`
      : null,
    subscribe: 'instances'
  }
}))({
  render,
  reducer
}))
