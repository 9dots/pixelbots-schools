/**
 * Imports
 */

import middleware from './middleware'
import element from 'vdux/element'
import App from 'components/app'
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

function render (request) {
  return new Promise((resolve, reject) => {
    const {subscribe, render} = vdux({
      middleware: middleware(request),
      initialState,
      reducer
    })

    const stop = subscribe(state => {
      try {
        const html = render(<App state={state} />)

        if (state.ready) {
          stop()
          resolve(html)
        }
      } catch (err) {
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
