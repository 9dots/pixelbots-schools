/**
 * Imports
 */

import socket, {subscribe, unsubscribe} from 'middleware/socket'
import {component, element} from 'vdux'
import equal from '@f/equal'
import map from '@f/map'
import has from '@f/has'

/**
 * Live HOC
 */

export default fn => Component => component({
  initialState: ({props}) => map((val, key) => ({
    history: [],
    value: undefined
  }), fn(props)),
  * onCreate ({props, path, actions}) {
    const descriptors = fn(props)

    for (const key in descriptors) {
      if (!descriptors[key]) continue

      yield subscribe({
        ...normalize(descriptors[key]),
        path,
        cb: msg => actions.update(key, msg)
      })
    }
  },

  middleware: typeof window !== 'undefined' && [
    socket
  ],

  render ({props, state, children}) {
    const newProps = map(
      (val, key) => has(key, state)
        ? {...val, value: val.value && state[key].value ? state[key].value : val.value}
        : val,
        props
    )

    return (
      <Component {...newProps}>{children}</Component>
    )
  },

  * onUpdate (prev, next) {
    const pdescs = fn(prev.props)
    const ndescs = fn(next.props)
    const queue = []

    for (const key in ndescs) {
      const pdesc = normalize(pdescs[key])
      const ndesc = normalize(ndescs[key])
      if (!ndesc) continue

      if (prev.props[key] && next.props[key] && prev.props[key].value !== next.props[key].value) {
        queue.push(next.actions.change(key, next.props[key].value))
      }

      if (!pdesc || pdesc.url !== ndesc.url || !equal(pdesc.params, ndesc.params)) {
        if (pdesc) {
          queue.push(next.actions.clearHistory(key))
          queue.push(unsubscribe({...pdesc, path: prev.path}))
        }

        queue.push(subscribe({
          ...ndesc,
          path: next.path,
          cb: msg => next.actions.update(key, msg)
        }))
      }
    }

    // Queue everything up so that the subscribe/unsubscribes dont
    // block the updates that come down from props
    yield queue
  },

  reducer: {
    clearHistory: (state, key) => ({
      [key]: {
        ...state[key],
        history: []
      }
    }),
    change: (state, key, value) => ({
      [key]: {
        ...state[key],
        value: state[key].history.reduce(applyUpdate, value)
      }
    }),
    update: (state, key, msg) => state[key] && ({
      [key]: {
        ...state[key],
        history: state[key].history.concat(msg),
        value: applyUpdate(state[key].value, msg)
      }
    })
  },

  * onRemove ({props, path}) {
    const descriptors = fn(props)

    for (const key in descriptors) {
      yield unsubscribe({
        ...normalize(descriptors[key]),
        path
      })
    }
  }
})

/**
 * Helpers
 */

function normalize (descriptor) {
  return typeof descriptor === 'string'
    ? {url: descriptor}
    : descriptor
}

function applyUpdate (prev, {data, verb}) {
  switch (verb) {
    case 'change': {
      if (prev._id) return data

      return {
        ...prev,
        items: prev.items.map(item => item._id === data._id ? data : item)
      }
    }
    case 'add': {
      if (prev._id) throw new Error('Cannot add to scalar value')

      // If it's already there, don't do anything
      if (prev.items.some(item => item._id === data._id)) {
        return prev
      }

      return {
        ...prev,
        items: [data, ...prev.items]
      }
    }
    case 'remove': {
      if (prev._id) throw new Error('Cannot remove from scalar value')

      return {
        ...prev,
        items: prev.items.filter(item => item._id !== data._id)
      }
    }
    default: {
      throw new Error('live: Unrecognized subscription verb (' + verb + ')')
    }
  }
}
