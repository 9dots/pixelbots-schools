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
  const {activities, more, emptyState, currentUser} = props
  const {value, loaded, loading} = activities

  return (
    <InfiniteScroll w='calc(100% + 12px)' loading={loading} more={() => value && more(value.nextPageToken)}>
        {
          loaded && renderItems(value.items, emptyState, children, currentUser)
        }
    </InfiniteScroll>
  )
}

function renderItems(items, emptyState, children, user) {
  const heights = map(estimateHeight, items)

  return (
    items.length
      ? <Grid>
          {children}
          {map(activity => <ActivityTile showActions user={user} activity={activity} />, items)}
        </Grid>
      : emptyState
  )
}

/**
 * Helpers
 */

function estimateHeight ({image, description, likersLength}) {
  let height = imageHeight(image)

  // Row height is 30 px, roughly 40 characters per row
  if (description) height += Math.ceil(description.length / 40) * 30
  if (likersLength) height += 25

  return height
}

function imageHeight (image = {}) {
  const {width, height} = image

  return !width || !height
    ? 0
    : Math.min((230 * height) / width, 350)
}

/**
 * Exports
 */

export default {
  render
}
