/**
 * Imports
 */

import {component, element} from 'vdux'
import {Block, Input} from 'vdux-ui'
import extend from '@f/extend'

/**
 * <DropZone/>
 */

export default component({
  render ({props, children, actions, state}) {
    const mergedProps = props.dragonProps && state.over
      ? extend({}, props, props.dragonProps)
      : props

    const {
      accepts = [], dragonProps, message, uploading,
      onDragOver, onDragEnter, onDragLeave, onDrop,
      ...rest
    } = mergedProps

    const stop = actions.acceptTypes(accepts)

    return (
      <Block
        {...rest}
        onDragOver={[stop, actions.over, onDragOver]}
        onDragEnter={[stop, actions.over, onDragEnter]}
        onDragLeave={[stop, actions.leave, onDragLeave]}
        onDrop={[stop, actions.leave, onDrop]}>
        <Block wide tall align='center center' hide={uploading}>
          {message}
        </Block>
        {children}
      </Block>
    )
  },

  events: {
    acceptTypes (model, accepts, e) {
      accepts = Array.isArray(accepts)
        ? accepts
        : [accepts]

      const {types} = e._rawEvent.dataTransfer

      if (types.every(type => accepts.indexOf(type) === -1)) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
  },

  reducer: {
    over: () => ({over: true}),
    leave: () => ({over: false})
  }
})
