/**
 * Imports
 */

import Router from 'components/Router'
import {initializeApp} from 'reducer'
import Loading from 'pages/Loading'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'
import 'lib/fonts'

/**
 * Root app component
 */

function *onCreate ({props}) {
  yield initializeApp(props.state.ready)
}

function render ({props}) {
  const {state} = props

  return (
    <Block pb={48}>
      <Block>
        {state.modal}
      </Block>
      <Block z={0}>
        {
          isReady(state)
            ? <Router {...state} />
            : <Loading />
        }
      </Block>
    </Block>
  )
}

/**
 * Helpers
 */

function isReady (state) {
  return state.ready
}

summon.defaults({
  baseUrl: process.env.API_SERVER
})

/**
 * Exports
 */

export default {
  onCreate,
  render
}
