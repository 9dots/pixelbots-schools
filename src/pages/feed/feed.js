/**
 * Imports
 */

import {following} from 'reducer/collections'
import TileFeed from 'components/TileFeed'
import AppLayout from 'layouts/App'
import element from 'vdux/element'
import {Block} from 'vdux-ui'
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
      <Block w='col_main' mt={12} mx='auto'>
        {
          following && !following.loading
            ? <TileFeed items={map(id => entities[id], following.ids)} />
            : <span>Loading...</span>
        }
      </Block>
    </AppLayout>
  )
}

/**
 * Exports
 */

export default {
  onCreate,
  render
}
