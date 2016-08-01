/**
 * Imports
 */

import CommoncoreBadge from 'components/CommoncoreBadge'
import ActivityObject from 'components/ActivityObject'
import ActivityHeader from 'components/ActivityHeader'
import {setUrl} from 'redux-effects-location'
import AttachmentMenu from './AttachmentMenu'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {Block, Icon, Card} from 'vdux-ui'
import {Button} from 'vdux-containers'
import findIndex from '@f/find-index'
import element from 'vdux/element'
import summon from 'vdux-summon'
import index from '@f/index'
import map from '@f/map'

/**
 * initialState
 */

function initialState ({props}) {
  const {activity} = props

  return {
    editedActivity: activity,
    editing: activity._object[0].attachments.length
      ? undefined
      : 'header'
  }
}

/**
 * <ActivityEditor/>
 */

function render ({props, local, state}) {
  const {save, ...rest} = props
  const {editing, editedActivity} = state
  const {attachments} = editedActivity._object[0]
  let idx = 0
  let target = false

  return (
    <Block>
      <Card w={756}>
        <ActivityHeader
          clickableTags
          activity={editedActivity}
          editable
          editing={editing === 'header'}
          onEdit={header => local(change)({...editedActivity, ...header})}
          open={() => saveAndOpen('header')} />
        <Block>
          {
            map((object, i) => (
              <Block
                key={object._id}
                draggable
                onMouseDown={e => {target = e.target}}
                onDragStart={e => onDragStart(e, object._id)}
                onDragOver={onDragOver(object._id)}
                onDragEnd={local(setDragging, null)}
                bgColor={state.dragging === object._id ? '#e2f4fb' : undefined}>
                <ActivityObject
                  editable
                  hidden={state.dragging === object._id}
                  onEdit={editObject(i)}
                  activity={editedActivity}
                  object={object}
                  editing={editing === object._id}
                  remove={removeObject(object._id)}
                  save={() => saveNow()}
                  open={() => saveAndOpen(object._id)}
                  idx={object.objectType === 'question' ? idx++ : null}
                  {...rest} />
              </Block>), attachments)
          }
        </Block>
      </Card>
      <Block h={18} onDrop={e => e.preventDefault()} onDragOver={onDragOver()} />
      <AttachmentMenu attach={attach} startsOpen={!attachments.length} />
    </Block>
  )

  function onDragStart (e, id) {
    if(!target.classList.contains('handle'))
      e.preventDefault()
    else
      return local(setDragging, id)()
  }

  function onDragOver (id) {
    return e => {
      e.preventDefault()
      if (id === state.dragging) return
      return insertBefore(state.dragging, id)
    }
  }

  function * saveNow () {
    if (state.dirty) {
      yield save(state.editedActivity)
      yield local(clearDirty)()
    }
  }

  function * saveAndOpen (id) {
    yield saveNow()
    yield local(open)(id)
  }

  function editObject (idx, oldObj) {
    return function (newObj) {
      const newActivity = {
        ...editedActivity,
        _object: [{
          ...editedActivity._object[0],
          attachments: [...editedActivity._object[0].attachments]
        }]
      }

      newActivity._object[0].attachments[idx] = newObj
      return local(change)(newActivity)
    }
  }

  function removeObject (id) {
    return function * () {
      const newActivity = {
        ...editedActivity,
        _object: [{
          ...editedActivity._object[0],
          attachments: [
            ...editedActivity._object[0].attachments
              .filter(({_id}) => id !== _id)
          ]
        }]
      }

      yield save(newActivity)
      yield local(open)(id)
      yield local(change)(newActivity)
    }
  }

  function * attach (object) {
    yield local(open)(editing)
    yield local(change)({
      ...editedActivity,
      _object: [{
        ...editedActivity._object[0],
        attachments: [
          ...editedActivity._object[0].attachments,
          object
        ]
      }]
    })
    yield local(open)(object._id)
  }

  function * insertBefore (src, target) {
    const attachments = editedActivity._object[0].attachments.slice()
    const srcIdx = findIndex(attachments, ({_id}) => _id === src)
    const [obj] = attachments.splice(srcIdx, 1)

    if (target) {
      const targetIdx = findIndex(attachments, ({_id}) => _id === target)
      attachments.splice(targetIdx, 0, obj)
    } else {
      attachments.push(obj)
    }

    yield local(change)({
      ...editedActivity,
      _object: [{
        ...editedActivity._object[0],
        attachments
      }]
    })
  }
}

/**
 * onUpdate
 */

function onUpdate (prev, next) {
  if (prev.props.activity !== next.props.activity) {
    const {activity} = next.props
    const {editedActivity} = next.state

    return [
      next.local(change)({
        ...editedActivity,
        _object: [{
          ...editedActivity._object[0],
          attachments: map(
            (att, i) => mergeAttachments(att, activity._object[0].attachments[i]),
            editedActivity._object[0].attachments
          )
        }]
      }),
      next.local(clearDirty)()
    ]
  }
}

const media = ['video', 'image', 'document', 'link']
function mergeAttachments (edited, saved) {
  if (media.indexOf(edited.objectType) !== -1) {
    return {
      ...saved,
      originalContent: edited.originalContent
    }
  }

  return {
    ...edited,
    content: saved.content,
    attachments: (saved.attachments || []).map((att, i) => ({
      ...edited.attachments[i],
      content: att.content
    }))
  }
}

/**
 * Actions
 */

const open = createAction('<ActivityEditor/>: open')
const change = createAction('<ActivityEditor/>: change')
const clearDirty = createAction('<ActivityEditor/>: clear dirty')
const setDragging = createAction('<ActivityEditor/>: set dragging')

/**
 * Reducer
 */

const reducer = handleActions({
  [open]: (state, id) => ({
    ...state,
    editing: id === state.editing
      ? null
      : id
  }),
  [clearDirty]: state => ({
    ...state,
    dirty: false
  }),
  [change]: (state, editedActivity) => ({
    ...state,
    dirty: true,
    editedActivity
  }),
  [setDragging]: (state, dragging) => ({
    ...state,
    dragging
  })
})

/**
 * Exports
 */

export default summon(({activity}) => ({
  save: body => ({
    saving: {
      url: `/share/${activity._id}`,
      method: 'PUT',
      body: {
        ...body,
        __v: activity.__v
      }
    }
  })
}))({
  initialState,
  render,
  onUpdate,
  reducer
})
