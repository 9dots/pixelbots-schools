/**
 * Imports
 */

import summon from 'vdux-summon'

/**
 * Summon channels
 */

function summonChannels (fn) {
  return summon(props => ({
    activities: `/share?${
      [].concat(fn(props))
        .map(ch => `channel=${ch}`)
        .join('&')
    }&maxResults=20`,
    more: pageToken => ({
      activities: {
        params: {
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
    })
  }))
}

/**
 * Exports
 */

export default summonChannels
