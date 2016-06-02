/**
 * Imports
 */

import InviteTeacherModal from 'modals/InviteTeacherModal'
import InfiniteScroll from 'components/InfiniteScroll'
import summonSearch from 'lib/summon-search'
import UserTile from 'components/UserTile'
import {Grid, Block, Icon} from 'vdux-ui'
import {openModal} from 'reducer/modal'
import {Text} from 'vdux-containers'
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
      ? map(user => <UserTile currentUser={me._id === user._id} user={user} />, items)
      : <EmptyState query={query} />
  )
}

function EmptyState({props}) {
  return(
    <Block p textAlign='center' w='col_main'>
      <Icon name='people' fs='xxl' color='yellow'/>
      <Block fs='s' lighter mx='auto' w='col_m'>
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
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default summonSearch('people', 'people')({
  render
})
