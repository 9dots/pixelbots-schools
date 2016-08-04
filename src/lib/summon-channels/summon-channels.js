/**
 * Imports
 */

import summon from 'vdux-summon'

/**
 * Summon channels
 */

function summonChannels (fn, extras = {}, sort) {
  return summon(props => ({
    activities: {
      url: fn(props) && `/share?${
        normalizeChannels(fn(props))
          .map(ch => `channel=${ch}`)
          .join('&')
      }&maxResults=30${sort ? '&sort=' + sort : ''}`,
      subscribe: 'activity_feed'
    },
    more: pageToken => ({
      activities: {
        params: pageToken && {
          pageToken
        }
      }
    }),
    search: query => ({
      activities: {
        clear: true,
        params: {
          query
        }
      }
    }),
    ...(typeof extras === 'function' ? extras(props) : extras)
  }))
}

/**
 * Helpers
 */

function normalizeChannels (ch) {
  ch = [].concat(ch)

  if (ch.length === 0) {
    ch.push('')
  }

  return ch
}

/**
 * Exports
 */

export default summonChannels
