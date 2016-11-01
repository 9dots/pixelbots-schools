/**
 * Imports
 */

import {identify} from 'middleware/analytics'
import Transition from 'vdux-transition'
import {component, element} from 'vdux'
import Router from 'components/Router'
import {isApiServer} from 'lib/api'
import Loading from 'pages/Loading'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'
import Form from 'vdux-form'
import live from 'lib/live'
import moment from 'moment'
import 'lib/fonts'

/**
 * <App/>
 */

export default summon(() => ({
  currentUser: '/user'
}))(live(({currentUser}) => ({
  currentUser: {
    url: '/user',
    params: {
      id: currentUser.value && currentUser.value._id
    }
  }
}))(component({
  onCreate ({props}) {
    if (!props.currentUser.loading) {
      return identify(props.currentUser.value)
    }
  },

  * onUpdate (prev, next) {
    const {props, actions, state} = next
    const {currentUser = {}} = props

    if (!state.ready && (currentUser.loaded || currentUser.error)) {
      yield actions.appDidInitialize()
    }

    if (prev.props.currentUser.loading && !next.props.currentUser.loading) {
      yield identify(next.props.currentUser.value)
    }
  },

  render ({props, state}) {
    const {toast, modal, currentUser} = props
    if (!currentUser.loaded && !currentUser.error) return <span/>

    return (
      <Block>
        <Block>
          <Transition>{toast}</Transition>
          {modal && modal()}
        </Block>
        <Block z={0}>
          {
            state.ready
              ? <Router {...props} currentUser={currentUser.error ? null : currentUser.value} {...state} />
              : <Loading />
          }
        </Block>
      </Block>
    )
  },

  reducer: {
    appDidInitialize: () => ({ready: true})
  }
})))

/**
 * Global component config
 */

summon.configure({
  baseUrl: process.env.API_SERVER,
  credentials: {
    type: 'query',
    pattern: isApiServer,
    name: 'access_token',
    token: ({getContext}) => getContext().authToken
  }
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
