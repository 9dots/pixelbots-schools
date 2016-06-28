/**
 * Imports
 */

import PageTitle from 'components/PageTitle'
import AppLayout from 'layouts/AppLayout'
import {Flex, Block, Text} from 'vdux-ui'
import NavTile from 'components/NavTile'
import Link from 'components/Link'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <SearchLayout/>
 */

function render ({props, children}) {
  const {counts = {}, currentUser, query = ''} = props
  const value = counts.value || {}

  return (
    <AppLayout bgColor='grey_medium' search {...props}>
      <PageTitle title='Search | Weo' />
      <Flex align='center center' h={46} bgColor='off_white' boxShadow='0 1px 2px 0 rgba(0,0,0,0.22)'>
        <NavTile href={`/search/activities/${query}`} highlight='red'>
          {count(value.activities)} Activities
        </NavTile>
        {
          currentUser
            ? <NavTile href={`/search/my-activities/${query}`} highlight='green'>
                {count(value.my_activities)} My Activities
              </NavTile>
            : undefined
        }
        <NavTile href={`/search/boards/${query}`} highlight='blue'>
          {count(value.boards)} Boards
        </NavTile>
        <NavTile href={`/search/people/${query}`} highlight='yellow'>
          {count(value.people)} People
        </NavTile>
      </Flex>
      <Flex align='center' minHeight='200px'>
        <Block mt='m' w='col_main'>
          {children}
        </Block>
      </Flex>
    </AppLayout>
  )
}

function count (n) {
  return (
    <Text color='grey_medium'>{n || 0}&nbsp;</Text>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  counts: `/search/counts?query=${props.query}`
}))({
  render
})
