/**
 * Imports
 */

import objectIdMw, {generateObjectId as generateObjectIdEffect} from 'middleware/objectId'
import uploadMw, {uploadFile as uploadFileEffect} from 'middleware/upload'
import scrollMw, {scrollTo as scrollToEffect} from 'middleware/scroll'
import summon, {invalidate, middleware as summonMw} from 'vdux-summon'
import fetchMw, {fetch, fetchEncodeJSON} from 'redux-effects-fetch'
import fastclickMw, {initFastclick} from 'middleware/fastclick'
import analyticsMw, * as analytics from 'middleware/analytics'
import locationMw, * as location from 'redux-effects-location'
import OAuthMw, {beginOAuthFlow} from 'middleware/oauth'
import mediaMw, {watchMedia} from 'redux-effects-media'
import cookieMw, {cookie} from 'redux-effects-cookie'
import {query} from 'redux-effects-credentials'
import {component, element} from 'vdux'
import modalMw from 'middleware/modal'
import printMw from 'middleware/print'
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
      actions.initializeAuth(),
      actions.initializeMedia(),
      actions.watchUrl(),
      initFastclick()
    ]
  },

  initialState ({props}) {
    if (props.req) {
      const cookieObj = cookieParser.parse(props.req.headers.cookie || '')

      return {
        currentUrl: props.req.url,
        authToken: cookieObj.authToken || ''
      }
    }

    return {}
  },

  getContext ({props, state, actions}) {
    const {media, authToken, currentUrl, avatarUpdates} = state
    const userAgent = props.req
      ? props.req.headers['user-agent']
      : window.navigator.userAgent

    return {
      uiTheme: theme,
      uiMedia: media,
      uiPrefixUserAgent: userAgent,
      currentUrl,
      avatarUpdates,
      authToken,
      ...actions
    }
  },

  render ({props, state}) {
    return state.authToken !== undefined
      ? <App {...state} {...props} />
      : <span />
  },

  onUpdate (prev, next) {
    if (prev.state.title !== next.state.title && typeof document !== 'undefined') {
      document.title = next.state.title
    }
  },

  middleware: {
    browser: [
      scrollMw,
      locationMw(),
      cookieMw(),
      objectIdMw,
      fastclickMw,
      analyticsMw,
      OAuthMw
    ],

    shared: [
      fetchEncodeJSON,
      fetchMw,
      summonMw,
      uploadMw,
      query(isApiServer, 'access_token', ({getState}) => getState().authToken),
      modalMw,
      mediaMw,
      printMw
    ]
  },

  controller: {
    * initializeAuth ({actions, state}) {
      if (state.authToken === undefined) {
        const token = yield cookie('authToken')
        yield actions.updateToken(token || '')
      }
    },

    * setAuthToken ({actions}, token) {
      yield cookie('authToken', token, {path: '/'})
      yield actions.updateToken(token)
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

    * postLogin ({actions}, user) {
      const token = user ? user.token : null
      yield actions.setAuthToken(token)
      yield invalidate('/user')
      yield actions.setUrl('/')
    },

    * toast ({actions}, fn, time = 4500) {
      yield actions.showToast(fn)
      yield sleep(time)
      yield actions.hideToast()
    },

    * logoutUser ({actions}) {
      yield actions.postLogin(null)
    },

    * oauthLogin ({actions}, provider, params = {}, cb) {
      const data = yield beginOAuthFlow(provider)
      const {value} = yield fetch(`${apiServer}/auth/${provider}`, {
        method: 'PUT',
        body: {
          ...data,
          ...params
        }
      })
      yield actions.postLogin(value.token)
    },

    * oauthCreate ({actions}, provider, params = {}) {
      const data = yield beginOAuthFlow(provider)
      const {value} = yield fetch(`${apiServer}/auth/${provider}`, {
        method: 'POST',
        body: {
          ...data,
          ...params
        }
      })
      yield actions.postLogin(value.token)
    },

    generateObjectId: wrapEffect(generateObjectIdEffect),
    scrollTo: wrapEffect(scrollToEffect),
    uploadFile: wrapEffect(uploadFileEffect),
    ...map(wrapEffect, location),
    ...map(wrapEffect, analytics)
  },

  reducer: {
    updateAvatar: state => ({
      avatarUpdates: state.avatarUpdates + 1
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
    updateToken: (state, authToken) => ({authToken}),
    openModal: (state, modal) => ({modal}),
    closeModal: () => ({modal: null}),
    showToast: (state, toast) => ({toast}),
    hideToast: () => ({toast: null}),
    setTitle: (state, title) => ({title})
  }
})

/**
 * Helpers
 */

function wrapEffect (fn) {
  return (model, ...args) => fn(...args)
}

/**
 * Test whether or not a URL points to our API server
 * Useful for adding credentials and such
 */

function isApiServer (url) {
  return url.indexOf(process.env.API_SERVER) === 0
}

/**
 * Global config
 */

summon.configure({
  baseUrl: process.env.API_SERVER,
  credentials: {
    type: 'query',
    pattern: isApiServer,
    name: 'access_token',
    token: ({getContext}) => getContext().authToken
  },

  transformError (err) {
    if (err.url && isApiServer(err.url) && err.status >= 400 && err.status < 500) {
      return {
        ...err,
        value: {
          ...err.value,
          errors: Object
            .keys(err.value.errors)
            .map(field => ({field, message: err.value.errors[field].message}))
        }
      }
    }

    return err
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
