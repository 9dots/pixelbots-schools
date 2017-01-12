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
 * <School Students/>
 */

export default summon(({userSearch: query}) => ({
  students: {
    subscribe: 'connect_people',
    url: query
      ? `/search/people?query=${query}&maxResults=12`
      : '/user/similar?maxResults=12'
  },
  more: pageToken => ({
    students: {
      params: pageToken && {pageToken}
    }
  })
}))(component({
  render ({props}) {
  	const {students, currentUser, more} = props
	  const {value, loaded, loading} = students

  	if (!loaded && loading) return <Loading show h={200} />

    return (
    	<Block>
    		<InfiniteScroll more={more(value.nextPageToken)}>
	        <Grid mt={-8}>
	          {
	            loaded && value.items.length
	              ? map(user =>
	                <Row currentUser={currentUser} user={user} />, value.items)
	              : <Block /> // Empty results goes here
	          }
	        </Grid>
	      </InfiniteScroll>
    	</Block>
    )
  }
}))

const Row = component({
  render ({props}) {
    return (
      <Block>
        row
      </Block>
    )
  }
})
