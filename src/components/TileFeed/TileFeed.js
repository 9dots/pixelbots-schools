/**
 * Imports
 */

import ActivityTile from 'components/ActivityTile'
import element from 'vdux/element'
import {Grid} from 'vdux-ui'
import map from '@f/map'

/**
 * Tile feed
 */

function render ({children, props}) {
  const {items} = props
  return (
    <Grid>
      {children}
      {
        map(activity => <ActivityTile activity={activity} />, items)
      }
    </Grid>
  )
}

/**
 * Exports
 */

export default {
  render
}
