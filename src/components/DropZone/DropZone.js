/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import element from 'vdux/element'
import extend from '@f/extend'
import {Block} from 'vdux-ui'

/**
 * <DropZone/>
 */

function render ({props, children, local, state}) {
  const mergedProps = props.dragonProps && state.over
    ? extend({}, props, props.dragonProps)
    : props

  const {
    accepts = [], dragonProps, message, uploading,
    onDragOver, onDragEnter, onDragLeave, onDrop,
    ...rest
  } = mergedProps

  const stop = acceptTypes(accepts)

  return (
    <Block
      {...rest}
      onDragOver={[stop, local(over), onDragOver]}
      onDragEnter={[stop, local(over), onDragEnter]}
      onDragLeave={[stop, local(leave), onDragLeave]}
      onDrop={[stop, local(leave), onDrop]}>
      {children}

      <Block wide tall align='center center' hide={uploading}>
        {message}
      </Block>
    </Block>
  )
}

/**
 * Actions
 */

const over = createAction('<DropZone/>: over', null, () => ({logLevel: 'debug'}))
const leave = createAction('<DropZone/>: leave', null, () => ({logLevel: 'debug'}))

function acceptTypes (accepts) {
  accepts = Array.isArray(accepts)
    ? accepts
    : [accepts]

  return e => {
    const {types} = e._rawEvent.dataTransfer

    if (types.every(type => accepts.indexOf(type) === -1)) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
}

/**
 * Reducer
 */

const reducer = handleActions({
  [over]: state => ({...state, over: true}),
  [leave]: state => ({...state, over: false})
})

/**
 * Exports
 */

export default {
  render,
  reducer
}
