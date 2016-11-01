/**
 * Imports
 */

import {setupStylePrefixer} from 'vdux-ui'
import middleware from './middleware'
import domready from '@f/domready'
import Boot from 'components/Boot'
import fastclick from 'fastclick'
import {element} from 'vdux'
import vdux from 'vdux/dom'
import jss from './jss'

/**
 * Setup styles
 */

jss.attach()
setupStylePrefixer(window.navigator.userAgent)

/**
 * Render loop
 */

domready(() => {
  fastclick(document.body)
})

const {forceRerender} = vdux(() => <Boot />, {
  prerendered: !! window.__initialState__,
  initialState: window.__initialState__,
  middleware
})

/**
 * Hot module replacement
 */

if (module.hot) {
  module.hot.decline()
  module.hot.unaccepted(() => window.location.reload(true))
  module.hot.accept(['components/Boot'], (...args) => {
    try {
      jss.detach()
      require('components/Boot')
      jss.attach()
      forceRerender()
    } catch (err) {
      console.log('hot update err', err)
      throw err
    }
  })
}
