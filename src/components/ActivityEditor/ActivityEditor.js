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
    editing: 'header'
  }
}

/**
 * <ActivityEditor/>
 */

function render ({props, local, state}) {
  const {save, defaultPoints, ...rest} = props
  const {editing, editedActivity} = state
  const {attachments} = editedActivity._object[0]
  let idx = 0
  let target = false

  return (
    <Block>
      <Card w={756}>
        <ActivityHeader
          editable
          clickableTags
          activity={editedActivity}
          editing={editing === 'header'}
          open={() => saveAndOpen('header')}
          onEdit={header => local(change)({...editedActivity, ...header})} />
        <Block>
          {
            map((object, i) => (
              <Block
                draggable
                key={object._id}
                onDragOver={onDragOver(object._id)}
                onDragEnd={local(setDragging, null)}
                onMouseDown={e => {target = e.target}}
                onDragStart={e => onDragStart(e, object._id)}
                bgColor={state.dragging === object._id ? '#e2f4fb' : undefined}>
                <ActivityObject
                  editable
                  object={object}
                  onEdit={editObject(i)}
                  save={() => saveNow()}
                  activity={editedActivity}
                  editing={editing === object._id}
                  remove={removeObject(object._id)}
                  open={() => saveAndOpen(object._id)}
                  hidden={state.dragging === object._id}
                  idx={object.objectType === 'question' ? idx++ : null}
                  {...rest} />
              </Block>), attachments)
          }
        </Block>
      </Card>
      <Block h={18} onDrop={e => e.preventDefault()} onDragOver={onDragOver()} />
      <AttachmentMenu attach={attach} startsOpen={!attachments.length} defaultPoints={defaultPoints} />
    </Block>
  )

  function onDragStart (e, id) {
    if(!target.classList.contains('handle')) {
      e.preventDefault()
    } else {
      e._rawEvent.dataTransfer.setData('weo_attachment', id)
      return local(setDragging, id)()
    }
  }

  function onDragOver (id) {
    return e => {
      if (e._rawEvent.dataTransfer.types.indexOf('weo_attachment') === -1) return
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
          attachments: mergeAttachments(editedActivity._object[0].attachments, activity._object[0].attachments)
        }]
      }),
      next.local(clearDirty)()
    ]
  }
}

const media = ['video', 'image', 'document', 'link']

function mergeAttachments (edited, saved) {
  const result = []
  const idMap = index(({_id}) => _id, saved)

  for (let i = 0; i < edited.length; i++) {
    const att = edited[i]

    idMap[att._id]
      ? result.push(mergeAttachment(att, idMap[att._id]))
      : result.push(att)
  }

  return result
}

function mergeAttachment (edited, saved) {
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
