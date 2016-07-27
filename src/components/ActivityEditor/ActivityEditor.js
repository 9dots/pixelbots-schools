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
import {Button} from 'vdux-containers'
import {Block, Icon, Card} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'
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
  const {activity, save, ...rest} = props
  const {editing, editedActivity} = state
  let idx = 0

  // This allows us to edit a new object before
  // saving it
  const origAtt = activity._object[0].attachments
  const editAtt = editedActivity._object[0].attachments
  const attachments = origAtt.length < editAtt.length
    ? [...origAtt, editAtt[editAtt.length - 1]]
    : origAtt

  return (
    <Block>
      <Card w={756} mb={18}>
        <ActivityHeader
          clickableTags
          activity={activity}
          editable
          editing={editing === 'header'}
          onEdit={header => local(change)({...activity, ...header})}
          open={() => saveAndOpen('header')} />
        <Block>
          {
            map((object, i) => <ActivityObject
              editable
              onEdit={editObject(i)}
              activity={activity}
              object={object}
              editObject={
                editing === object._id
                  ? editedActivity._object[0].attachments[i]
                  : null
              }
              editing={editing === object._id}
              remove={removeObject(object._id)}
              open={() => saveAndOpen(object._id)}
              idx={object.objectType === 'question' ? idx++ : null}
              {...rest} />, attachments)
          }
        </Block>
      </Card>
      <AttachmentMenu attach={attach} startsOpen={!attachments.length} />
    </Block>
  )

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
}

/**
 * Actions
 */

const open = createAction('<ActivityEditor/>: open')
const change = createAction('<ActivityEditor/>: change')
const clearDirty = createAction('<ActivityEditor/>: clear dirty')

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
  reducer
})
