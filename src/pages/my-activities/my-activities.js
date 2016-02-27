/**
 * Imports
 */

import TileFeed from 'components/tile-feed'
import {col_main} from 'lib/styles'
import AppLayout from 'layouts/app'
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
