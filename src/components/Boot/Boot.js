/**
 * Imports
 */

import {bindUrl, setUrl as setUrlEffect, back as backEffect} from 'redux-effects-location'
import {generateObjectId as generateObjectIdEffect} from 'middleware/objectId'
import {uploadFile as uploadFileEffect} from 'middleware/upload'
import {invalidate, middleware as summonMw} from 'vdux-summon'
import {scrollTo as scrollToEffect} from 'middleware/scroll'
import {setTitle as setTitleEffect} from 'middleware/title'
import {watchMedia} from 'redux-effects-media'
import {cookie} from 'redux-effects-cookie'
import {component, element} from 'vdux'
import App from 'components/App'
import theme from 'lib/theme'
import sleep from '@f/sleep'

/**
 * <Boot/>
 */

export default component({
  onCreate ({actions}) {
    return [
      actions.initializeAuth(),
      actions.initializeMedia(),
      actions.watchUrl()
    ]
  },

  getContext ({state, actions}) {
    const {updateAvatar} = actions
    const {media, authToken, currentUrl, avatarUpdates} = state

    return {
      uiTheme: theme,
      uiMedia: media,
      currentUrl,
      avatarUpdates,
      authToken,
      ...actions
    }
  },

  render ({props, state}) {
    return state.authToken !== undefined
      ? <App {...state} {...props} />
      : <span/>
  },

  middleware: [
    summonMw
  ],

  events: {
    * initializeAuth ({actions}) {
      const token = yield cookie('authToken')
      yield actions.updateToken(token || '')
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
      yield bindUrl(actions.updateUrl)
    },

    * postLogin ({actions}, user) {
      yield actions.setAuthToken(user.token)
      yield invalidate('/user')
      yield setUrl('/')
    },

    * toast ({actions}, fn, time = 4500) {
      yield actions.showToast(fn)
      yield sleep(time)
      yield hideToast()
    },

    * setUrl (model, ...args) {
      yield setUrlEffect(...args)
    },

    * back (model, ...args) {
      yield backEffect(...args)
    },

    * generateObjectId () {
      yield generateObjectIdEffect()
    },

    * scrollTo (model, ...args) {
      yield scrollToEffect(...args)
    },

    * uploadFile (model, ...args) {
      yield uploadFileEffect(...args)
    },

    * setTitle (model, ...args) {
      yield setTitleEffect(...args)
    },

    * logoutUser ({actions}) {
      yield actions.postLogin(null)
    }
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
    updateUrl: (state, currentUrl) => ({currentUrl}),
    updateToken: (state, authToken) => ({authToken}),
    openModal: (state, modal) => ({modal}),
    closeModal: () => ({modal: null}),
    showToast: (state, toast) => ({toast}),
    hideToast: () => ({toast: null})
  }
})
