/**
 * Imports
 */

import ActivityTile from 'components/activity-tile'
import Grid from 'components/grid'
import element from 'vdux/element'
import css from 'jss-simple'
import map from '@f/map'

/**
 * Tile feed
 */

function render ({props}) {
  const {items} = props

  return (
    <div>
      <Grid>
        {
          map(activity => <ActivityTile activity={activity} />, items)
        }
      </Grid>
    </div>
  )
}

/**
 * Exports
 */

export default {
  render
}
