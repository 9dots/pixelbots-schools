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

    const {acceptTypes, over, leave} = actions
    const stop = {handler: acceptTypes}

    return (
      <Block
        {...rest}
        onDragOver={[stop, over, onDragOver]}
        onDragEnter={[stop, over, onDragEnter]}
        onDragLeave={[stop, leave, onDragLeave]}
        onDrop={[stop, leave, onDrop]}>
        <Block wide tall align='center center' hide={uploading}>
          {message}
        </Block>
        {children}
      </Block>
    )
  },

  events: {
    acceptTypes ({props}, e) {
      let {accepts = []} = props
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
