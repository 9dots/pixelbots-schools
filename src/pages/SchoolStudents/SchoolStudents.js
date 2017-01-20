/**
 * Imports
 */

import {Block, Table, TableHeader, TableCell, Card, Icon} from 'vdux-ui'
import InfiniteScroll from 'components/InfiniteScroll'
import SortHeader from 'components/SortHeader'
import summonPrefs from 'lib/summon-prefs'
import UserTile from 'components/UserTile'
import {TableRow} from 'vdux-containers'
import Loading from 'components/Loading'
import {component, element} from 'vdux'
import Avatar from 'components/Avatar'
import Link from 'components/Link'
import summon from 'vdux-summon'
import map from '@f/map'

/**
 * Constants
 */

const headProps = {p: '10px 12px', align: 'start center'}

/**
 * <School Students/>
 */

export default summonPrefs()(
  summon(({userSearch: query, school, prefs: {schoolStudentSort = {}}}) => ({
    students: `/school/${school._id}/students?maxResults=10&sort=${encodeURIComponent(schoolStudentSort.property || '')}&dir=${schoolStudentSort.dir || ''}`,
    more: pageToken => ({
      students: {
        params: pageToken && {pageToken}
      }
    })
  }))(
component({
  render ({props}) {
  	const {students, currentUser, more, prefs: {schoolStudentSort = {}}} = props
	  const {value, loaded, loading} = students

  	if (!loaded && loading) return <Loading show h={200} />

    const {property = 'name.givenName', dir = 1} = schoolStudentSort

    return (
    	<Block>
    		<InfiniteScroll more={more(value.nextPageToken)}>
	        <Table bg='white' boxShadow='card' wide tall>
            <TableRow bg='grey' color='white' textAlign='left'>
              <TableHeader />
              <TableHeader>
                <Block {...headProps}>
                  First Name
                  <Icon hide={property !== 'name.givenName'} name='arrow_drop_down' fs='s' ml='s' />
                </Block>
              </TableHeader>
              <TableHeader>
                <Block {...headProps}>
                  Last Name
                  <Icon hide={property !== 'name.familyName'} name='arrow_drop_down' fs='s' ml='s' />
                </Block>
              </TableHeader>
              <TableHeader>
                <Block {...headProps}>
                  Username
                  <Icon hide={property !== 'username'} name='arrow_drop_down' fs='s' ml='s' />
                </Block>
              </TableHeader>
            </TableRow>
	          {
	            loaded && value.items.length
	              ? map(user =>
	                <Row currentUser={currentUser} user={user} />, value.items)
	              : <Block /> // Empty results goes here
	          }
	        </Table>
	      </InfiniteScroll>
    	</Block>
    )
  },

  controller: {
    * setSort ({props}, sort, property) {
      yield props.setPref('schoolStudentSort', {
        property,
        dir: property === sort.property ? sort.dir * -1 : 1
      })
    }
  }
})))

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
