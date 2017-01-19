/**
 * Imports
 */

import {Checkbox, Table, TableHeader, TableCell, Block, Icon} from 'vdux-ui'
import {wrap, CSSContainer, TableRow, Button, Text} from 'vdux-containers'
import InfiniteScroll from 'components/InfiniteScroll'
import StudentDropdown from './StudentDropdown'
import EmptyState from 'components/EmptyState'
import StudentOptions from './StudentOptions'
import UserTile from 'components/UserTile'
import summonPrefs from 'lib/summon-prefs'
import Loading from 'components/Loading'
import {component, element} from 'vdux'
import Avatar from 'components/Avatar'
import Link from 'components/Link'
import getProp from '@f/get-prop'
import summon from 'vdux-summon'
import map from '@f/map'

/**
 * <School Students/>
 */

export default summonPrefs()(summon(({userSearch: query}) => ({
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
  render ({props, actions}) {
  	const {students, currentUser, more, prefs} = props
	  const {value, loaded, loading} = students
    const headProps = {p: '10px 12px', align: 'start center'}
    const sort = prefs.schoolStudentSort || {property: 'name.givenName', dir: 1}

  	if (!loaded && loading) return <Loading show h={200} />
    if (!value.items || !value.items.length) {
      return (
        <EmptyState icon='people' color='blue' fill>
          No Students Have Joined Your School Yet
          <Button py mt='l' px='32px' boxShadow='z2'>
            <Icon fs='s' name='add' mr />
            Add Students
          </Button>
        </EmptyState>
      )
    }

    return (
    	<Block>
    		<InfiniteScroll more={more(value.nextPageToken)}>
          <StudentOptions />
	        <Table bg='white' boxShadow='card' wide tall>
            <TableRow bg='grey' color='white' textAlign='left'>
              <TableHeader p w='50'>
                <Checkbox />
              </TableHeader>
              <TableHeader /> 
              <StudentHeader text='First Name' prop='name.givenName' sort={sort} setSort={actions.setSort} />
              <StudentHeader text='Last Name' prop='name.familyName' sort={sort} setSort={actions.setSort} />
              <StudentHeader text='Username' prop='username' sort={sort} setSort={actions.setSort} />
              <TableHeader/>
            </TableRow>
	          {
	            loaded && 
                map(user => <Row currentUser={currentUser} user={user} />, value.items.sort(cmp))
	          }
	        </Table>
	      </InfiniteScroll>
    	</Block>
    )

    function cmp (a, b) {
      if (!sort) return
      const prop = sort.property
      const bool = norm(prop, a) === norm(prop, b)
        ? norm('displayName', a) > norm('displayName', b)
        : norm(prop, a) > norm(prop, b)

      return bool ? 1 * sort.dir : -1 * sort.dir

      function norm(prop, obj) {
        return getProp(prop, obj).toUpperCase()
      }
    }
  },

  controller: {
    * setSort ({props}, prop) {
      const {setPref, prefs} = props
      const sort = prefs.schoolStudentSort || {dir: 1, property: 'name.givenName'}

      yield setPref('schoolStudentSort', {
        property: prop,
        dir: prop === sort.property ? sort.dir * -1 : 1
      })
    }
  }
})))


const StudentHeader = wrap(CSSContainer, {p: true, textAlign: 'left', hoverProps: {hover: true}})({
  render ({props}) {
    const {hover, sort, prop, text, setSort, ...rest} = props

    return (
      <TableHeader pointer onClick={setSort(prop)} {...rest}>
        <Block align='start center'>
          <Text underline={hover}>
            {text}
          </Text>
          <Icon
            name={'arrow_drop_' + (sort.dir === 1 ? 'down' : 'up')}
            hidden={sort.property !== prop}
            ml='s'
            fs='s' />
        </Block>
      </TableHeader>
    )
  }
})


const underline = {underline: true}
const cellProps = {p: '10px 12px'}

const Row = wrap(CSSContainer, {
  hoverProps: {
    highlight: true,
    showSettings: true
  }
})(component({
  render ({props}) {
    const {user, highlight, showSettings} = props
    const {name: {givenName}, name: {familyName}, username} = user
    return (
      <TableRow borderBottom='1px solid grey_light' bgColor={highlight ? '#fafdfe' : 'white'}>
        <TableCell p w='50'>
          <Checkbox />
        </TableCell>
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
        <TableCell>
          <StudentDropdown showSettings={showSettings} />
        </TableCell>
      </TableRow>
    )
  }
}))
