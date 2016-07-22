/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import CommentCard from './CommentCard'
import {Block} from 'vdux-containers'
import {Icon, Card} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'
import map from '@f/map'

/**
 * <Comments/>
 */

function render ({props, local, state}) {
  const {
    comments, currentUser, question, activity,
    makeAnnot, deleteAnnot, editAnnot
  } = props
  const showNew = !comments.length || state.showNew
  const isStudent = currentUser.userType === 'student'

  return (
    <Block
      onClick={e => e.stopPropagation()}
      absolute={{left: 36, top: 0}}
      w={250}>
      <Block onClick={local(toggleDD, null)}>
        {
          map(comment => <CommentCard
            toggleDD={local(toggleDD, comment._id)}
            showDD={state.dropdownId === comment._id}
            actor={comment.actor}
            annotate={annotate}
            isOwner={currentUser._id === comment.actor.id}
            deleteAnnot={() => deleteAnnot(comment._id)}
            comment={comment}/>, comments)
        }
        <CommentCard
          dismiss={comments.length && local(toggleNew)}
          actor={currentUser}
          annotate={annotate}
          hide={!showNew}/>
        <Block
          onClick={local(toggleNew)}
          hoverProps={{opacity: 1}}
          align='center center'
          hide={showNew || isStudent}
          opacity='.85'
          pointer>
          <Icon lh='17px' name='add_circle_outline' fs='s' mr='s'/>
          <Block lh='17px'>
            Leave a note for {activity.actor.displayName}
          </Block>
        </Block>
      </Block>
    </Block>
  )

  function * annotate (model, annotation) {
    if (annotation) {
      annotation = {
        ...annotation,
        _object: [
          {
            ...annotation._object[0],
            originalContent: model.comment
          }
        ]
      }

      yield editAnnot(annotation)
    } else {
      const classId = activity.contexts[0].descriptor.id
      const sectionId = activity._object[0]._id
      const id = activity._id

      annotation = {
        _root: [{
          displayName: activity.displayName,
          url: activity.url,
          id: activity._id,
          actor: activity.actor
        }],
        _parent: [{
          actor: activity.actor,
          displayName: activity.displayName,
          id: activity.id,
          url: activity.url
        }],
        _object: [{
          attachments: [],
          objectType: 'annotation',
          originalContent: model.comment,
          location: {path: `share!${id}.${sectionId}.${question._id}`}
        }],
        channels: [`share!${id}.annotations`],
        shareType: 'annotation',
        contexts: [{
          allow: [
            {id: `group:teacher:${classId}`},
            {id: `group:student:${classId}`},
          ],
          descriptor: {
            displayName: classId,
            id: classId,
            url: `/class/${classId}`
          }
        }]
      }
      yield makeAnnot(annotation)
    }

  }
}

/**
 * Actions
 */

const toggleDD = createAction('<Comments/>: toggleDD')
const toggleNew = createAction('<Comments/>: toggleNew')

/**
 * Reducer
 */

const reducer = handleActions({
  [toggleNew]: state => ({...state, showNew: !state.showNew}),
  [toggleDD]: (state, id) => ({...state, dropdownId: id})
})


/**
 * Exports
 */

export default summon(() => ({
  makeAnnot: body => ({
    makingAnnot: {
      url: '/share',
      method: 'POST',
      invalidates: 'activity_feed',
      body
    }
  }),
  editAnnot: body => ({
    editingAnnot: {
      url: `/share/${body._id}`,
      method: 'PUT',
      invalidates: 'activity_feed',
      body
    }
  }),
  deleteAnnot: id => ({
    deletingAnnot: {
      url: `/share/${id}`,
      method: 'DELETE',
      invalidates: 'activity_feed'
    }
  })
}))({
  render,
  reducer
})
