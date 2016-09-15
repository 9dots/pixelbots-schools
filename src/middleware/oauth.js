/**
 * Imports
 */

import oauthFacebook from 'oauth-facebook'
import oauthGoogle from 'oauth-google'
import oauthUrl from 'oauth-url'
import popup from 'oauth-popup'

/**
 * Constants
 */

const beginType = 'OAuth: Begin Flow'
const origin = typeof window === 'undefined'
  ? ''
  : window.location.origin

/**
 * Middleware
 */

function middleware () {
  return next => action => action.type === beginType
    ? oauth(action.payload.provider)
    : next(action)
}

/**
 * Action creator
 */

function beginOAuthFlow (provider) {
  return {
    type: beginType,
    payload: {
      provider
    }
  }
}

/**
 * Providers
 */

const providers = {
  google: oauthGoogle({
    clientId: process.env.GOOGLE_CLIENT_ID,
    scope: ['profile', 'email']
  }),
  facebook: oauthFacebook({
    clientId: process.env.FACEBOOK_APP_ID,
    scope: ['email', 'user_friends']
  }),
  clever: {
    baseUrl: 'https://clever.com/oauth/authorize',
    scopeDelimiter: ' ',
    scopePrefix: '',
    clientId: process.env.CLEVER_CLIENT_ID,
    redirectUri: origin + '/clever/',
    scope: ['read:students', 'read:teachers', 'read:user_id']
  },
  office365: {
    baseUrl: 'https://login.microsoftonline.com/common/oauth2/authorize',
    clientId: process.env.OFFICE365_CLIENT_ID,
    params: {
      msafed: 0
    }
  }
}

/**
 * Popup dimensions
 */

const dims = {
  width: 452,
  height: 633
}

/**
 * oauth - Execute an OAuth flow
 *
 * @param {String} provider - Name of the provider (e.g. 'google')
 * @returns {Promise}
 */

function oauth (provider, params = {}) {
  return new Promise((resolve, reject) => {
    if (!providers[provider]) throw new Error('lib/oauth: unknown provider')

    const data = {
      ...providers[provider],
      ...params
    }

    popup(oauthUrl(data), dims, (err, data) =>
      err
        ? reject(err)
        : resolve(getProvider(provider, data))
    )
  })
}

/**
 * getProvider - Generate OAuth params for a particular provider
 *
 * @param {String} provider - Name of the OAuth provider (e.g. 'google')
 *                            in the providers map
 * @param {Object} data - Additional, request specific data
 */

function getProvider (provider, data) {
  return {
    code: data.code,
    redirectUri: providers[provider].redirectUri || origin,
    scope: data.scope
  }
}

/**
 * Exports
 */

export default middleware
export {
  beginOAuthFlow
}
