/**
 * Imports
 */

import {component, element} from 'vdux'
import setProp from '@f/set-prop'
import summon from 'vdux-summon'

/**
 * summonPrefs
 */

export default function summonPrefs (extras = {}) {
  return Component => summon(props => ({
    persistPref: (name, value) => ({
      persistingPref: {
        url: `/preference/${name}`,
        invalidates: '/user',
        method: 'PUT',
        body: {
          value
        }
      }
    }),
    ...(typeof extras === 'function' ? extras(props) : {})
  }))(component({
    initialState: ({props}) => props.currentUser.preferences || {},

    render ({props, actions, state, children}) {
      return (
        <Component {...props} prefs={state} setPref={actions.setPref}>
          {children}
        </Component>
      )
    },

    events: {
      * setPref ({actions, props}, name, value) {
        yield actions.updatePref(name, value)
        yield props.persistPref(name, value)
      }
    },

    reducer: {
      updatePref: (state, name, value) => setProp(name, state, value)
    }
  }))
}
