/**
 * Imports
 */

import scrollMw, {scrollTo as scrollToEffect} from 'middleware/scroll'
import summon, {invalidate, middleware as summonMw} from 'vdux-summon'
import fetchMw, {fetch, fetchEncodeJSON} from 'redux-effects-fetch'
import auth, {signInWithProvider, signInWithToken, signOut} from 'middleware/auth'
import fastclickMw, {initFastclick} from 'middleware/fastclick'
import analyticsMw, * as analytics from 'middleware/analytics'
import locationMw, * as location from 'redux-effects-location'
import OAuthMw, {beginOAuthFlow} from 'middleware/oauth'
import mediaMw, {watchMedia} from 'redux-effects-media'
import cookieMw, {cookie} from 'redux-effects-cookie'
import {
  middleware as firebaseMw,
  set as firebaseSet,
  update as firebaseUpdate,
  once as firebaseOnce,
  push as firebasePush,
  transaction
} from 'vdux-fire'
import firebaseConfig from 'lib/firebase-config'
import {query} from 'redux-effects-credentials'
import {component, element} from 'vdux'
import modalMw from 'middleware/modal'
import printMw from 'middleware/print'
import flox, {fork} from '@flox/fork'
import escapeRe from 'escape-regexp'
import cookieParser from 'cookie'
import App from 'components/App'
import theme from 'lib/theme'
import Form from 'vdux-form'
import sleep from '@f/sleep'
import moment from 'moment'
import map from '@f/map'

/**
 * Constants
 */

const apiServer = process.env.API_SERVER

/**
 * <Boot/>
 */

export default component({
  onCreate ({actions}) {
    return [
      actions.initializeMedia(),
      actions.watchUrl(),
      initFastclick()
    ]
  },

  getContext ({props, state, actions}) {
    const {media, currentUrl, avatarUpdates} = state
    const userAgent = props.req
      ? props.req.headers['user-agent']
      : window.navigator.userAgent

    return {
      uiTheme: theme,
      uiMedia: media,
      uiPrefixUserAgent: userAgent,
      currentUrl,
      avatarUpdates,
      userId: state.userId,
      ...actions
    }
  },

  render ({props, state}) {
    return <App key={state.userId} {...state} {...props} />
  },

  onUpdate (prev, next) {
    if (prev.state.title !== next.state.title && typeof document !== 'undefined') {
      document.title = next.state.title
    }
  },

  middleware: {
    browser: [
      auth,
      scrollMw,
      locationMw(),
      fastclickMw,
      analyticsMw,
      modalMw,
      flox
    ],

    shared: [
      firebaseMw(firebaseConfig),
      fetchMw,
      mediaMw,
      printMw
    ]
  },

  controller: {
    * signInWithProvider (model, ...args) {
      yield signInWithProvider(...args)
    },
    * signOut ({context}, ...args) {
      yield signOut(...args)
      yield context.setUserId(null)
      yield context.setUrl('/')
    },

    * initializeMedia ({actions}) {
      yield watchMedia({
        print: 'print',
        xs: 'screen and (max-width: 599px)',
        sm: 'screen and (min-width: 600px) and (max-width: 959px)',
        md: 'screen and (min-width: 960px) and (max-width: 1279px)',
        lg: 'screen and (min-width: 1280px)'
      }, actions.updateMedia)
    },

    * watchUrl ({actions}) {
      yield location.bindUrl(actions.updateUrl)
    },

    * toast ({actions}, fn, time = 4500) {
      yield actions.showToast(fn)
      yield sleep(time)
      yield actions.hideToast()
    },
    signInWithToken: wrapEffect(signInWithToken),
    scrollTo: wrapEffect(scrollToEffect),
    firebaseSet: wrapEffect(firebaseSet),
    firebaseUpdate: wrapEffect(firebaseUpdate),
    firebaseOnce: wrapEffect(firebaseOnce),
    firebaseTransaction: wrapEffect(transaction),
    firebasePush: wrapEffect(firebasePush),
    fetch: wrapEffect(fetch),
    ...map(wrapEffect, location),
    ...map(wrapEffect, analytics)
  },

  reducer: {
    updateAvatar: state => ({
      avatarUpdates: (state.avatarUpdates || 0) + 1
    }),
    updateMedia: (state, {key, matches}) => ({
      media: state.media === key
        ? matches ? key : null
        : matches ? key : state.media
    }),
    updateUrl: (state, currentUrl) => ({
      currentUrl,
      modal: state.currentUrl === currentUrl ? state.modal : null
    }),
    openModal: (state, modal) => ({
      // Dont allow modal opening on the server, because it causes
      // issues with server-side rendering
      modal: typeof window === 'undefined' ? null : modal
    }),
    closeModal: () => ({modal: null}),
    showToast: (state, toast) => ({toast}),
    hideToast: () => ({toast: null}),
    setTitle: (state, title) => ({title}),
    setUserId: (state, userId) => ({userId}),
    setUsername: (state, username) => ({username})
  }
})

/**
 * Helpers
 */

function wrapEffect (fn) {
  return (model, ...args) => fn(...args)
}

/**
 * Global config
 */

// Form.setTransformError(err => {
//   if (err.status >= 400 && err.status < 500) {
//     return err.value && err.value.errors
//   }
// })

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
