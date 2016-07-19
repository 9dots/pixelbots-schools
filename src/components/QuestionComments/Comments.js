/**
 * Imports
 */

import {Button, Textarea, Block, DropdownMenu, MenuItem, wrap, CSSContainer} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {Icon, Card, Text} from 'vdux-ui'
import CommentCard from './CommentCard'
import Avatar from 'components/Avatar'
import Document from 'vdux/Document'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'
import moment from 'moment'
import map from '@f/map'

/**
 * <QuestionComments/>
 */

function render ({props, local, state}) {
  const {
    comments, currentUser, question,
    activity, makeAnnotation, makingAnnotation = {}
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
            comment={comment}/>, comments)
        }
        <CommentCard
          dismiss={comments.length && local(toggleNew)}
          actor={currentUser}
          annotate={annotate}
          hide={!showNew}/>
        <Block hoverProps={{opacity: 1}} opacity='.85' pointer onClick={local(toggleNew)} align='center center' hide={showNew || isStudent}>
          <Icon lh='17px' name='add_circle_outline' fs='s' mr='s'/>
          <Block lh='17px'>Leave a note for {activity.actor.displayName}</Block>
        </Block>
      </Block>
    </Block>
  )

  function * annotate (model) {
    const classId = activity.contexts[0].descriptor.id
    const sectionId = activity._object[0]._id
    const id = activity._id

    const annotation = {
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
        location: `share!${id}.${sectionId}.${question._id}`
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
    console.log(annotation)
    yield makeAnnotation(annotation)
  }
}

const toggleDD = createAction('<Comments/>: toggleDD')
const toggleNew = createAction('<Comments/>: toggleNew')

const reducer = handleActions({
  [toggleNew]: state => ({...state, showNew: !state.showNew}),
  [toggleDD]: (state, id) => ({...state, dropdownId: id})
})


/**
 * Exports
 */

export default summon(() => ({
  makeAnnotation: (body) => ({
    makingAnnotation:  {
      url: '/share',
      method: 'POST',
      invalidates: 'activity_feed',
      body
    }
  })
}))({
  render,
  reducer
})
