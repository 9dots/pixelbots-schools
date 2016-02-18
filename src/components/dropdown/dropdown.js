/**
 * Imports
 */

import combineReducers from '@f/combine-reducers'
import handleActions from '@f/handle-actions'
import ClickAway from 'components/click-away'
import createAction from '@f/create-action'
import Menu from 'components/menu'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * initialState
 */

function initialState () {
  return {
    open: false
  }
}

/**
 * Render dropdown component
 */

function render ({props, state, local, children}) {
  const {open} = state
  const [createToggle, ...items] = children

  return (
    <span>
      {createToggle(local(toggle))}
      {
        open && (
          <ClickAway onClickedAway={local(close)}>
            <Menu>{items}</Menu>
          </ClickAway>
        )
      }
    </span>
  )
}

/**
 * Actions
 */

const toggle = createAction('dropdown: toggle')
const close = createAction('dropdown: close')

/**
 * Reducer
 */

const reducer = combineReducers({
  open: handleActions({
    [toggle]: state => !state,
    [close]: () => false
  })
})

/**
 * Exports
 */

export default {
  initialState,
  render,
  reducer
}
