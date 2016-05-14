/**
 * Imports
 */

import {appDidInitialize} from 'reducer/ready'
import Router from 'components/Router'
import {initializeApp} from 'reducer'
import Loading from 'pages/Loading'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'
import Form from 'vdux-form'
import 'lib/fonts'

/**
 * Root app component
 */

function *onCreate ({props}) {
  yield initializeApp(props.state.ready)
  yield props.getCurrentUser()
}

function render ({props}) {
  const {state, currentUser} = props

  return (
    <Block pb={48}>
      <Block>
        {state.modal}
      </Block>
      <Block z={0}>
        {
          isReady(state) && currentUser && currentUser.loaded
            ? <Router {...state} currentUser={currentUser.value} />
            : <Loading />
        }
      </Block>
    </Block>
  )
}

function onUpdate (prev, next) {
  if (!isReady(next.props.state) && !next.props.currentUser.loading) {
    return appDidInitialize()
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
  getCurrentUser: () => ({
    currentUser: '/user'
  })
}))({
  onCreate,
  onUpdate,
  render
})
