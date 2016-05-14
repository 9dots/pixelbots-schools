/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import ActivityTile from 'components/ActivityTile'
import Loading from 'components/Loading'
import element from 'vdux/element'
import {Grid} from 'vdux-ui'
import map from '@f/map'

/**
 * Tile feed
 */

function render ({children, props}) {
  const {activities, more} = props
  const {value, loaded, loading} = activities

  return (
    <InfiniteScroll more={() => value && more(value.nextPageToken)}>
      <Grid>
        {children}
        {
          loaded && map(activity => <ActivityTile activity={activity} />, value.items)
        }
      </Grid>
    </InfiniteScroll>
  )
}

/**
 * Exports
 */

export default {
  render
}
