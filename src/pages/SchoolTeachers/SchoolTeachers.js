/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import UserTile from 'components/UserTile'
import Loading from 'components/Loading'
import {component, element} from 'vdux'
import {Block, Grid} from 'vdux-ui'
import summon from 'vdux-summon'
import map from '@f/map'

/**
 * <School Teachers/>
 */

export default summon(({userSearch: query, school}) => ({
  people: `/school/${school._id}/teachers`,
  more: pageToken => ({
    people: {
      params: pageToken && {pageToken}
    }
  })
}))(component({
  render ({props}) {
  	const {people, currentUser, more} = props
	  const {value, loaded, loading} = people

  	if (!loaded && loading) return <Loading show h={200} />

    return (
    	<Block>
    		<InfiniteScroll more={more(value.nextPageToken)}>
	        <Grid mt={-8}>
	          {
	            loaded && value.items.length
	              ? map(user =>
	                <UserTile currentUser={currentUser} user={user} />, value.items)
	              : <Block /> // Empty results goes here
	          }
	        </Grid>
	      </InfiniteScroll>
    	</Block>
    )
  }
}))
