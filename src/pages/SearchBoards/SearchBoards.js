/**
 * Imports
 */

import CreateBoardModal from 'modals/CreateBoardModal'
import InfiniteScroll from 'components/InfiniteScroll'
import {Grid, Block, Icon, Text} from 'vdux-ui'
import summonSearch from 'lib/summon-search'
import BoardTile from 'components/BoardTile'
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

function renderItems(user, items, query) {
  return (
    items.length
      ? map(board => <BoardTile currentUser={user} board={board} />, items)
      : <EmptyState query={query} currentUser={user} />
  )
}

function EmptyState({props}) {
  const {currentUser, query} = props
  return (
    <Block p textAlign='center' w='col_main'>
      <Icon name='dashboard' fs='xxl' color='blue'/>
      <Block fs='s' lighter mx='auto' w='col_m'>
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
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default summonSearch('boards', 'boards')({
  render
})
