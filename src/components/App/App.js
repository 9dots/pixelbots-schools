/**
 * Imports
 */

import {appDidInitialize} from 'reducer/ready'
import applyClasses from '@f/apply-classes'
import Router from 'components/Router'
import {initializeApp} from 'reducer'
import Loading from 'pages/Loading'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'
import Form from 'vdux-form'
import moment from 'moment'
import 'lib/fonts'

/**
 * Root app component
 */

function render ({path, props}) {
  const {state, currentUser} = props
  if (!currentUser.loaded) return <span/>

  return (
    <Block>
      <Block>
        {state.modal && state.modal()}
      </Block>
      <Block z={0}>
        {
          isReady(state)
            ? <Router {...state} currentUser={currentUser.error ? null : currentUser.value} />
            : <Loading />
        }
      </Block>
    </Block>
  )
}

function onUpdate (prev, next) {
  const {props} = next
  const {currentUser = {}, state} = props

  if (!isReady(state) && (currentUser.loaded || currentUser.error)) {
    return appDidInitialize()
  }

  if (next.props.state.modal && !prev.props.state.modal) {
    applyClasses({modal: true}, document.body)
  } else if (!next.props.state.modal && prev.props.state.modal) {
    applyClasses({modal: false}, document.body)
  }
}

/**
 * Global component config
 */

summon.defaults({
  baseUrl: process.env.API_SERVER
})

Form.setTransformError(err => {
  if (err.status === 400) {
    return err.value && err.value.errors
  }
})

moment.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[last] dddd',
    nextWeek: 'dddd',
    sameElse: 'MMMM D, YYYY'
  }
})

/**
 * Helpers
 */

function isReady (state) {
  return state.ready
}

/**
 * Exports
 */

export default summon(props => ({
  currentUser: '/user'
}))({
  onUpdate,
  render
})
