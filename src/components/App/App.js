/**
 * Imports
 */

import {appReady, component, element, t} from 'vdux'
import Transition from 'vdux-transition'
import Router from 'components/Router'
import Loading from 'pages/Loading'
import {Block} from 'vdux-ui'
import fire from 'vdux-fire'
import map from '@f/map'

/**
 * <App/>
 */

export default fire(props => ({
  currentUser: `/users/${props.userId}`
}))(component({
  * onCreate ({props, state, actions, context}) {
    if (!state.ready) {
      yield actions.appDidInitialize()
      yield appReady({title: props.title})
    }
    if (!props.currentUser.loading) {
      yield context.identify(props.currentUser.value)
    }
  },

  * onUpdate (prev, next) {
    const {props, actions, state, context} = next
    const {currentUser = {}, school = {}} = props
    const nprops = next.props
    const pprops = prev.props

    if (prev.props.currentUser.loading && !next.props.currentUser.loading) {
      yield context.identify(next.props.currentUser.value)
    }

    // if (!nprops.school.loading && pprops.currentUser.value && nprops.currentUser.value && pprops.currentUser.value.school !== nprops.currentUser.value.school) {
    //   yield next.props.summonInvalidate('/school')
    // }
  },

  render ({props, state, context}) {
    const {toast, modal, currentUser = {}, school} = props

    if (currentUser.loading && !currentUser.error) return <span />
    // if (!school.loaded && !school.error) return <span />

    return (
      <Block>
        <Block>
          <Transition>{toast}</Transition>
          {modal && modal()}
        </Block>
        <Block z={0}>
          {
            state.ready
              ? <Router {...props} currentUser={currentUser.error ? {} : (currentUser.value || {})} {...state} />
              : <Loading />
          }
        </Block>
      </Block>
    )
  },

  reducer: {
    appDidInitialize: () => ({
      ready: true
    })
  }
}))
