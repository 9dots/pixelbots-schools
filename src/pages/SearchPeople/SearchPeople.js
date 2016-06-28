/**
 * Imports
 */

import InviteTeacherModal from 'modals/InviteTeacherModal'
import InfiniteScroll from 'components/InfiniteScroll'
import EmptyState from 'components/EmptyState'
import summonSearch from 'lib/summon-search'
import UserTile from 'components/UserTile'
import {openModal} from 'reducer/modal'
import {Text} from 'vdux-containers'
import {Grid, Block} from 'vdux-ui'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <SearchPeople/>
 */

function render ({props}) {
  const {people, currentUser, more, query} = props
  const {value, loaded, loading} = people

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

function renderItems(me, items, query) {
  return (
    items.length
      ? map(user => <UserTile currentUser={me} user={user} />, items)
      : <EmptySearch query={query} />
  )
}

function EmptySearch({props}) {
  return(
    <EmptyState icon='people' color='yellow'>
      Sorry, we couldn't find anybody by that name.<br/>
      Try another search or invite&nbsp;
      <Text
        onClick={() => openModal(() => <InviteTeacherModal />)}
        hoverProps={{underline: true}}
        color='blue'
        pointer>
        {props.query}
      </Text>
      &nbsp;to join Weo.
    </EmptyState>
  )
}

/**
 * Exports
 */

export default summonSearch('people', 'people')({
  render
})
