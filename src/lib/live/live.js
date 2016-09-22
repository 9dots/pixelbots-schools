/**
 * Imports
 */

import {subscribe, unsubscribe} from 'middleware/socket'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import element from 'vdux/element'
import equal from '@f/equal'
import map from '@f/map'
import has from '@f/has'

/**
 * Actions
 */

const update = createAction('live: update')
const changeValue = createAction('live: change value')

/**
 * Live
 */

function live (fn) {
  return Component => ({
    * onCreate ({props, path, local}) {
      const descriptors = fn(props)

      for (const key in descriptors) {
        if (!descriptors[key]) continue

        yield subscribe({
          ...normalize(descriptors[key]),
          path,
          cb: msg => local(update)({key, msg})
        })
      }
    },

    render ({props, state, children}) {
      const newProps = map(
        (val, key) => has(key, state)
          ? {...val, value: state[key]}
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
            cb: msg => next.local(update)({key, msg})
          })
        }

        if (prev.props[key] && next.props[key] && prev.props[key].value !== next.props[key].value) {
          yield next.local(changeValue)({key, value: next.props[key].value})
        }
      }
    },

    reducer: handleActions({
      [changeValue]: (state, {key, value}) => state && ({
        ...state,
        [key]: value
      }),
      [update]: (state, {key, msg}) => state && (state[key] ? ({
        ...state,
        [key]: applyUpdate(state[key], msg)
      }) : state)
    }),

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
}

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

/**
 * Exports
 */

export default live
