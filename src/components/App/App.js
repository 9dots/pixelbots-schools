/**
 * Imports
 */

import {appDidInitialize} from 'reducer/ready'
import {identify} from 'middleware/analytics'
import Transition from 'vdux-transition'
import Router from 'components/Router'
import {initializeApp} from 'reducer'
import Loading from 'pages/Loading'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'
import Form from 'vdux-form'
import live from 'lib/live'
import moment from 'moment'
import 'lib/fonts'

/**
 * onCreate
 */

function onCreate ({props}) {
  if (!props.currentUser.loading) {
    return identify(props.currentUser.value)
  }
}

/**
 * Root app component
 */

function render ({path, props}) {
  const {state, currentUser} = props
  if (!currentUser.loaded && !currentUser.error) return <span/>

  return (
    <Block>
      <Block>
        <Transition>{state.toast}</Transition>
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

function * onUpdate (prev, next) {
  const {props} = next
  const {currentUser = {}, state} = props

  if (!isReady(state) && (currentUser.loaded || currentUser.error)) {
    yield appDidInitialize()
  }

  if (prev.props.currentUser.loading && !next.props.currentUser.loading) {
    yield identify(next.props.currentUser.value)
  }
}

/**
 * Global component config
 */

summon.defaults({
  baseUrl: process.env.API_SERVER
})

Form.setTransformError(err => {
  if (err.status >= 400 && err.status < 500) {
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

export default summon(() => ({
  currentUser: '/user'
}))(({
  onCreate,
  onUpdate,
  render
}))
