/**
 * Imports
 */

import middleware from './middleware'
import element from 'vdux/element'
import Boot from 'components/Boot'
import uiTheme from 'lib/theme'
import vdux from 'vdux/string'
import reducer from 'reducer/'

/**
 * initialState
 */

const initialState = {
  auth: {},
  user: {}
}

/**
 * Render to string
 */

function render (opts) {
  return new Promise((resolve, reject) => {
    const {subscribe, render} = vdux({
      middleware: middleware(opts),
      initialState,
      reducer
    })

    const stop = subscribe(state => {
      try {
        const html = render(<Boot state={state.app} />, {
          uiTheme,
          currentUrl: state.app.url,
          avatarUpdates: state.app.avatarUpdates
        })

        if (state.app.ready) {
          stop()
          resolve({html, state})
        }
      } catch (err) {
        console.log('caught err', err)
        reject(err)
        stop()
      }
    })
  })
}

/**
 * Exports
 */

export default render
