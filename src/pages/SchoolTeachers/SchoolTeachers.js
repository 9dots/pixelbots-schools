/**
 * Imports
 */

import InviteTeacherModal from 'modals/InviteTeacherModal'
import InfiniteScroll from 'components/InfiniteScroll'
import EmptyState from 'components/EmptyState'
import UserTile from 'components/UserTile'
import {Block, Grid, Icon} from 'vdux-ui'
import Loading from 'components/Loading'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import summon from 'vdux-summon'
import map from '@f/map'

/**
 * <School Teachers/>
 */

export default summon(({userSearch: query}) => ({
  people: {
    subscribe: 'connect_people',
    url: query
      ? `/search/people?query=${query}&maxResults=12`
      : '/user/similar?maxResults=12'
  },
  more: pageToken => ({
    people: {
      params: pageToken && {pageToken}
    }
  })
}))(component({
  render ({props, actions}) {
  	const {people, currentUser, more, user} = props
	  const {value, loaded, loading} = people

  	if (!loaded && loading) return <Loading show h={200} />

    return (
    	<Block>
    		<InfiniteScroll more={more(value.nextPageToken)}>
	        <Grid>
	          {
              loaded && renderItems(currentUser, user, value.items, actions.inviteTeacher)
	          }
	        </Grid>
	      </InfiniteScroll>
    	</Block>
    )
  },

  controller: {
    * inviteTeacher ({context}) {
      yield context.openModal(() => <InviteTeacherModal />)
    },
  }
}))

/**
 * Helpers
 */

function renderItems (me, user, items, fn) {
  return (
    items && items.length
      ? map(user => <UserTile currentUser={me} user={user} />, items)
      : <EmptyState icon='school' color='blue' fill>
          No Teachers Have Joined Your School Yet
          <Button py mt='l' px='32px' boxShadow='z2' onClick={fn}>
            <Icon fs='s' name='local_activity' mr />
            Invite Colleagues
          </Button>
        </EmptyState>
  )
}