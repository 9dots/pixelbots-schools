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
        ? {...val, value: val.value && state[key] ? state[key] : val.value}
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

    for (const key in ndescs) {
      const pdesc = normalize(pdescs[key])
      const ndesc = normalize(ndescs[key])
      if (!ndesc) continue

      if (!pdesc || pdesc.url !== ndesc.url || !equal(pdesc.params, ndesc.params)) {
        if (pdesc) yield unsubscribe({...pdesc, path: prev.path})
        yield subscribe({
          ...ndesc,
          path: next.path,
          cb: msg => next.actions.update(key, msg)
        })
      }

      if (prev.props[key] && next.props[key] && prev.props[key].value !== next.props[key].value) {
        yield next.actions.changeValue(key, next.props[key].value)
      }
    }
  },

  reducer: {
    changeValue: (state, key, value) => ({[key]: value}),
    update: (state, key, msg) => state[key] && ({
      [key]: applyUpdate(state[key], msg)
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
