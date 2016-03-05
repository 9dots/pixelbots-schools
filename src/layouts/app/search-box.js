/**
 * Imports
 */

import {mrg_left_small, ln_30, wide, medium, constants, fontSizes} from 'lib/styles'
import combineReducers from '@f/combine-reducers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import * as colors from 'lib/colors'
import {row, flex} from 'lib/layout'
import element from 'vdux/element'
import Icon from 'components/icon'
import css from 'jss-simple'
import rgba from '@f/rgba'

/**
 * initialState
 */

function initialState () {
  return {
    open: false
  }
}

/**
 * SearchBox
 */

function render ({local, state}) {
  const {open} = state
  const iconName = open ? 'close' : 'search'

  return (
    <div class={[ln_30, mrg_left_small, wide, box]}>
      <span class={row}>
        <div class={flex}></div>
        <Icon onClick={local(toggle)} class={[medium, icon, {open}]} name={iconName} />
        <input placeholder='Search Weo' class={[input, {open}]} type='text' />
      </span>
    </div>
  )
}

/**
 * Actions
 */

const toggle = createAction('<SearchBox/>: toggle open')

/**
 * Reducer
 */

const reducer = combineReducers({
  open: handleActions({
    [toggle]: open => !open
  })
})

/**
 * Style
 */

const {box, icon, input} = css({
  box: {
    maxWidth: 250,
    position: 'relative',
    display: 'block',
    clear: 'both'
  },
  icon: {
    position: 'absolute',
    left: 8,
    margin: 'auto',
    cursor: 'text',
    color: colors.text_color,
    lineHeight: '36px',
    transition: 'all .25s',
    zIndex: 1,
    pointerEvents: 'all',
    cursor: 'pointer',
    left: 'auto',
    top: 0,
    bottom: 0,
    right: constants.spacingSmall,
    lineHeight: constants.navBtnHeight + 'px',
    '&:not(.open)': {
      color: 'white'
    }
  },
  input: {
    color: '#666',
    fontSize: fontSizes.xs,
    fontWeight: 400,
    outline: 0,
    width: '100%',
    transitionProperty: 'width, padding, background-color',
    transitionDuration: '.35s',
    cursor: 'text',
    backgroundColor: rgba(colors.white, 0.8),
    lineHeight: '1.6em',
    boxSizing: 'content-box',
    transitionProperty: 'width, opacity',
    transitionDuration: '.35s',
    padding: `0 30px 0 ${constants.spacing}`,
    border: 0,
    borderRadius: '50px',
    height: constants.navBtnHeight,
    '&:not(.open)': {
      transitionProperty: 'width, opacity, padding',
      width: 0,
      padding: 0,
      opacity: 0
    }
  }
})

/**
 * Exports
 */

export default {
  initialState,
  render,
  reducer
}
