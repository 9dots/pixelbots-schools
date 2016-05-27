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
      [].concat(fn(props))
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
 * Exports
 */

export default summonChannels
