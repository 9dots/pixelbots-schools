/**
 * Imports
 */

import {following} from 'reducer/collections'
import TileFeed from 'components/tile-feed'
import {col_main} from 'lib/styles'
import AppLayout from 'layouts/app'
import element from 'vdux/element'
import css from 'jss-simple'
import map from '@f/map'

/**
 * onCreate - Load the following feed
 */

function onCreate () {
  return following.fetch()
}

/**
 * Following feed
 */

function render ({props}) {
  const {currentUser, collections, entities} = props
  const {following = {}} = collections

  return (
    <AppLayout {...props}>
      <div class={[col_main, feed]}>
        {
          following && !following.loading
            ? <TileFeed items={map(id => entities[id], following.ids)} />
            : <span>Loading...</span>
        }
      </div>
    </AppLayout>
  )
}

/**
 * Style
 */

const {feed} = css({
  feed: {
    marginTop: 12
  }
})

/**
 * Exports
 */

export default {
  onCreate,
  render
}
