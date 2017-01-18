/**
 * Imports
 */

import {Block, Table, TableHeader, TableCell, Card, Icon} from 'vdux-ui'
import InfiniteScroll from 'components/InfiniteScroll'
import EmptyState from 'components/EmptyState'
import UserTile from 'components/UserTile'
import {TableRow, Button} from 'vdux-containers'
import Loading from 'components/Loading'
import {component, element} from 'vdux'
import Avatar from 'components/Avatar'
import Link from 'components/Link'
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
    const headProps = {p: '10px 12px', align: 'start center'}

  	if (!loaded && loading) return <Loading show h={200} />
    if (!value.items || !value.items.length) {
      return (
        <EmptyState icon='people' color='blue' fill>
          No Students Have Joined Your School Yet
          <Button py mt='l' px='32px'>
            <Icon fs='s' name='add' mr />
            Add Students
          </Button>
        </EmptyState>
      )
    }

    return (
    	<Block>
    		<InfiniteScroll more={more(value.nextPageToken)}>
	        <Table bg='white' boxShadow='card' wide tall>
            <TableRow bg='grey' color='white' textAlign='left'>
              <TableHeader /> 
              <TableHeader>
                <Block {...headProps}>
                  First Name
                  <Icon name='arrow_drop_down' fs='s' ml='s' />
                </Block>
              </TableHeader>
              <TableHeader>
                <Block {...headProps}>
                  Last Name
                  <Icon name='arrow_drop_down' fs='s' ml='s' />
                </Block>
              </TableHeader>
              <TableHeader>
                <Block {...headProps}>
                  Username
                  <Icon name='arrow_drop_down' fs='s' ml='s' />
                </Block>
              </TableHeader>
            </TableRow>
	          {
	            loaded && 
                map(user => <Row currentUser={me} user={user} />, items)
	          }
	        </Table>
	      </InfiniteScroll>
    	</Block>
    )
  }
}))

const underline = {underline: true}
const cellProps = {p: '10px 12px'}

const Row = component({
  render ({props}) {
    const {user} = props
    const {name: {givenName}, name: {familyName}, username} = user
    return (
      <TableRow borderBottom='1px solid grey_light'>
        <TableCell {...cellProps}>
          <Avatar display='flex' actor={user} mr='s' sq='26' />
        </TableCell>
        <TableCell {...cellProps}>
          <Link hoverProps={underline} href={`/${username}`}>
            {givenName}
          </Link>
        </TableCell>
        <TableCell {...cellProps}>
          <Link hoverProps={underline} href={`/${username}`}>
            {familyName}
          </Link>
        </TableCell>
        <TableCell {...cellProps}>
          {username}
        </TableCell>
      </TableRow>
    )
  }
})
