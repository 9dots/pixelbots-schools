/**
 * Imports
 */

import Router from 'components/Router'
import {initializeApp} from 'reducer'
import {apiServer} from 'lib/config'
import Loading from 'pages/Loading'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

/**
 * Root app component
 */

function *onCreate ({props}) {
  yield initializeApp(props.state.ready)
}

function render ({props}) {
  const {state} = props

  return (
    <Block>
      {state.modal}
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
  baseUrl: apiServer
})

/**
 * Exports
 */

export default {
  onCreate,
  render
}
