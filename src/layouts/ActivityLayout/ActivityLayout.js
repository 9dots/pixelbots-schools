/**
 * Imports
 */

import DiscardDraftModal from 'modals/DiscardDraftModal'
import {constructInstance} from 'lib/activity-helpers'
import PageTitle from 'components/PageTitle'
import Redirect from 'components/Redirect'
import FourOhFour from 'pages/FourOhFour'
import {component, element} from 'vdux'
import maybeOver from '@f/maybe-over'
import mapValues from '@f/map-values'
import {Block} from 'vdux-ui'
import fire from 'vdux-fire'
import index from '@f/index'
import find from '@f/find'
import map from '@f/map'
import Nav from './Nav'

/**
 * Constants
 */

const printProps = {pb: 0}

/**
 * <ActivityLayout/>
 */

export default fire(({classRef, playlistRef}) => ({
  activity: {
    ref: `/classes/${classRef}`,
    join: {
      ref: '/playlistInstances',
      child: 'studentPlaylists',
      childRef: (val, ref) =>
        map((u, k) => ref.root
          .child('/playlistsByUser')
          .child(k)
          .child('byPlaylistRef')
          .child(playlistRef)
          .child('instanceRef')
          .once('value')
          .then(s => s.val())
          .then(iref => iref && ref.child(iref)), val.students || {})
    }
  },

  students: {
    ref: `/classes/${classRef}`,
    join: {
      ref: '/users/',
      child: 'students',
      childRef: (val, ref) => mapValues((v, key) => ref.child(key), val.students || {})
    }
  },

  playlist: `/playlists/${playlistRef}`
}))(component({
  render ({props, children, actions}) {
    const {currentUser, activity, playlist, students} = props

    if (activity.loading || students.loading || playlist.loading) {
      return <span/>
    }

    return (
      <Block class='app' pb='60vh' printProps={printProps}>
        {
          maybeOver({
            students: students.value.students,
            // sequence: playlist.value.sequence,
            instances: activity.value.studentPlaylists
          }, children)
        }
      </Block>
    )
  },

  * onUpdate (prev, next) {
    // const {instances, students, getInstance, gettingInstance, userId} = next.props

    // if (!gettingInstance && instances.value && students.value) {
    //   const studentMap = index(student => student._id, students.value.items)
    //   const seen = {}
    //   const insts = instances.value.items.filter(inst => {
    //     if (seen[inst.actor.id]) return false
    //     seen[inst.actor.id] = true
    //     return studentMap[inst.actor.id]
    //   })

    //   if (insts.length < students.value.items.length) {
    //     const filtered = students.value.items.filter(({_id}) => instances.value.items.every(inst => inst.actor.id !== _id))
    //     yield filtered.map(student => getInstance(student._id))
    //   } else if (userId && !instances.value.items.some(inst => inst.actor.id === userId)) {
    //     yield getInstance(userId)
    //   }
    // }
  },

  controller: {
    * backBtn ({props, actions, context}) {
      const {intent, canExit, activity} = props

      if (intent === 'new') {
        yield context.openModal(() => <DiscardDraftModal onAccept={actions.discardDraftAccept} activity={activity.value} />)
      } else {
        yield canExit ? context.back() : context.setUrl(escapeUrl(props))
      }
    },

    * exit ({props, actions, context}, action, stay) {
      const {activity, canExit, exitDepth} = props

      if (action === 'pin' && stay) {
        yield context.setUrl(`/activity/${activity.value._id}/preview`, true)
      } else if (canExit) {
        yield exitDepth === 2 ? [context.back(), context.back()] : context.back()
      } else {
        yield context.setUrl(escapeUrl(props))
      }
    }
  }
}))

/**
 * Internal rendering method
 */

function internal ({props, children, actions, context, state}) {
  const {activity, students, instances, settingStatus, redirect, currentUser, activityId, userId, setStatus, isEdit, intent} = props
  const {value, loaded, error} = activity
  const isInstance = !!userId

  if (error) {
    return <FourOhFour />
  }

  if (!loaded || !students.loaded || !instances.loaded) {
    return ''
  }

  // Make sure we're only looking at instances of students who are
  // currently enrolled in the class
  const seen = {}
  const studentMap = index(student => student._id, students.value.items)
  const filteredInstances = instances.value.items.filter(inst => {
    if (seen[inst.actor.id]) return false
    seen[inst.actor.id] = true
    return studentMap[inst.actor.id]
  })

  if (filteredInstances.length < students.value.items.length) {
    return ''
  }

  if (isInstance && currentUser.userType === 'student' && userId !== currentUser._id) {
    return <Redirect to={`/activity/${activityId}`} />
  }

  const constructedInstances = filteredInstances.map(inst => constructInstance(value, inst))
  const instance = userId
    ? find(constructedInstances, inst => inst.actor.id === userId)
    : null

  const classId = value.contexts[0].descriptor.id
  const {discussion} = value
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
    redirect || <Nav activity={value} isInstance={isInstance} savingIndicator={state.savingIndicator} user={currentUser} isPublic={isPublic} isEdit={isEdit} back={actions.backBtn} exit={actions.exit} isOwner={isOwner} intent={intent} {...nav} />,
    <PageTitle title={`${value.displayName}`} />,
    maybeOver({
      instance,
      activity: value,
      students: students.value.items,
      classId,
      instances: constructedInstances,
      savingIndicator: state.savingIndicator,
      setIndicator: actions.setIndicator,
      selectObject: actions.selectObject,
      selectedObject: state.selectedObject,
      setSpeaking: actions.setSpeaking,
      speakingId: state.speakingId,
      speechRate: (currentUser.preferences || {}).speech_speed || 1,
      setStatus,
      settingStatus
    }, children)
  ]
}

/**
 * Helpers
 */

function escapeUrl ({activity, currentUser}) {
  const {value} = activity

  if (value.channels[0] === 'user!' + value.actor.id + '.drafts') {
    return '/' + value.actor.username + '/boards/all'
  }

  if (value.channels[0] === 'user!' + value.actor.id + '.trash') {
    return '/' + value.actor.username + '/boards/trash'
  }

  return value.contexts[0].descriptor.id !== 'public'
    ? '/class/' + value.contexts[0].descriptor.id
    : value.actor.id === currentUser._id
      ? `/${value.actor.username}/boards/${value.contexts[1].descriptor.id}`
      : '/class/all'
}
