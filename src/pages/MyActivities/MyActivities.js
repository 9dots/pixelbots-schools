/**
 * Imports
 */

import TileFeed from 'components/TileFeed'
import {col_main} from 'lib/styles'
import AppLayout from 'layouts/App'
import element from 'vdux/element'
import css from 'jss-simple'
import map from '@f/map'


/**
 * myActivities
 */

function render ({props}) {
  return (
    <AppLayout {...props}>
      <div>Hello world</div>
    </AppLayout>
  )
}

/**
 * Exports
 */

export default {
  render
}
