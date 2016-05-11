/**
 * Imports
 */

import ActivityTile from 'components/ActivityTile'
import FeedWidgets from 'components/FeedWidgets'
import element from 'vdux/element'
import {Grid} from 'vdux-ui'
import map from '@f/map'

/**
 * Tile feed
 */

function render ({props}) {
  const {items} = props
  return (
    <Grid>
      <FeedWidgets />
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
