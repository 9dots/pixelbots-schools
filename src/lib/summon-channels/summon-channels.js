/**
 * Imports
 */

import summon from 'vdux-summon'

/**
 * Summon channels
 */

function summonChannels (fn, extras = {}) {
  return summon(props => ({
    activities: `/share?${
      normalizeChannels(fn(props))
        .map(ch => `channel=${ch}`)
        .join('&')
    }&maxResults=30`,
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
    ...extras
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
