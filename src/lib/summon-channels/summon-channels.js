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
        merge: 'concat',
        params: {
          pageToken
        }
      }
    }),
    search: query => ({
      activities: {
        merge: 'replace',
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
