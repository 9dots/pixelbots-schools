/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import summonSearch from 'lib/summon-search'
import BoardTile from 'components/BoardTile'
import element from 'vdux/element'
import {Grid} from 'vdux-ui'
import map from '@f/map'

/**
 * <SearchBoards/>
 */

function render ({props}) {
  const {boards, currentUser, more} = props
  const {value, loaded, loading} = boards

  return (
    <InfiniteScroll loading={loading} more={() => value && more(value.nextPageToken)}>
      {
        <Grid>
          {
            loaded && map(board =>
              <BoardTile
                currentUser={currentUser}
                board={board} />, value.items)
          }
        </Grid>
      }
    </InfiniteScroll>
  )
}

/**
 * Exports
 */

export default summonSearch('boards', 'boards')({
  render
})
