/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import element from 'vdux/element'
import setProp from '@f/set-prop'
import summon from 'vdux-summon'

/**
 * summonPrefs
 */

function summonPrefs (extras = {}) {
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
  }))({
    initialState ({props}) {
      const {currentUser} = props
      return currentUser.preferences || {}
    },

    render ({props, local, state, children}) {
      const {persistPref} = props

      return (
        <Component {...props} prefs={state} setPref={setPref}>
          {children}
        </Component>
      )

      function * setPref (name, value) {
        yield local(updatePref)({name, value})
        yield persistPref(name, value)
      }
    },

    reducer
  })
}

/**
 * Actions
 */

const updatePref = createAction('summon-prefs: update pref')

/**
 * Reducer
 */

const reducer = handleActions({
  [updatePref]: (state, {name, value}) => setProp(name, state, value)
})

/**
 * Exports
 */

export default summonPrefs
