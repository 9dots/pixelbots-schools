/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import ActivityTile from 'components/ActivityTile'
import element from 'vdux/element'
import {Grid} from 'vdux-ui'
import map from '@f/map'

/**
 * Tile feed
 */

function render ({children, props}) {
  const {activities, more, emptyState} = props
  const {value, loaded, loading} = activities

  return (
    <InfiniteScroll w='calc(100% + 12px)' loading={loading} more={() => value && more(value.nextPageToken)}>
        {
          loaded && renderItems(value.items, emptyState, children)
        }
    </InfiniteScroll>
  )
}

function renderItems(items, emptyState, children) {
  return (
    items.length
      ? <Grid>
          {children}
          {map(activity => <ActivityTile activity={activity} />, items)}
        </Grid>
      : emptyState
  )
}

/**
 * Exports
 */

export default {
  render
}
