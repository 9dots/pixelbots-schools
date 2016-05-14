/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import summonSearch from 'lib/summon-search'
import UserTile from 'components/UserTile'
import element from 'vdux/element'
import {Grid} from 'vdux-ui'
import map from '@f/map'

/**
 * <SearchPeople/>
 */

function render ({props}) {
  const {people, currentUser, more} = props
  const {value, loaded, loading} = people

  return (
    <InfiniteScroll loading={loading} more={() => value && more(value.nextPageToken)}>
      {
        <Grid>
          {
            loaded && map(user =>
              <UserTile
                currentUser={currentUser._id === user._id}
                user={user} />, value.items)
          }
        </Grid>
      }
    </InfiniteScroll>
  )
}

/**
 * Exports
 */

export default summonSearch('people', 'people')({
  render
})
