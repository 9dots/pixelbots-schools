/**
 * Imports
 */

import CreateBoardModal from 'modals/CreateBoardModal'
import InfiniteScroll from 'components/InfiniteScroll'
import EmptyState from 'components/EmptyState'
import summonSearch from 'lib/summon-search'
import BoardTile from 'components/BoardTile'
import {Grid, Block, Text} from 'vdux-ui'
import {openModal} from 'reducer/modal'
import element from 'vdux/element'
import Link from 'components/Link'
import map from '@f/map'

/**
 * <SearchBoards/>
 */

function render ({props}) {
  const {boards, currentUser, more, query} = props
  const {value, loaded, loading} = boards

  return (
    <InfiniteScroll loading={loading} more={() => value && more(value.nextPageToken)}>
      {
        <Grid>
          {
            loaded && renderItems(currentUser, value.items, query)
          }
        </Grid>
      }
    </InfiniteScroll>
  )
}

function renderItems (user, items, query) {
  return (
    items.length
      ? map(board => <BoardTile currentUser={user} board={board} />, items)
      : <EmptySearch query={query} currentUser={user} />
  )
}

function EmptySearch ({props}) {
  const {currentUser, query} = props
  return (
    <EmptyState icon='dashboard' color='blue'>
      Sorry, we couldn't find any boards for <Text bold>{query}</Text>
      <br/>
      Be the first to&nbsp;
      <Link
        href={`/${currentUser.username}/boards`}
        hoverProps={{underline: true}}
        color='blue'
        pointer>
        create your own!
      </Link>
    </EmptyState>
  )
}

/**
 * Exports
 */

export default summonSearch('boards', 'boards')({
  render
})
