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
    comments, currentUser, question, actor,
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
            Leave a note for {actor.displayName}
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
      yield makeAnnot({
        originalContent: model.comment
      })
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

export default summon(({activityId, question}) => ({
  makeAnnot: body => ({
    makingAnnot: {
      url: `/instance/${activityId}/annotate?objectId=${question._id}`,
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
