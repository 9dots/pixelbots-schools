/**
 * Imports
 */

import AppLayout from 'layouts/AppLayout'
import {Flex, Block, Text} from 'vdux-ui'
import Link from 'components/Link'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <SearchLayout/>
 */

function render ({props, children}) {
  const {counts = {}, query = ''} = props
  const value = counts.value || {}

  return (
    <AppLayout bgColor='grey_medium' search {...props}>
      <Flex align='center center' h={46} bgColor='off_white' boxShadow='0 1px 2px 0 rgba(0,0,0,0.22)'>
        <Item href={`/search/activities/${query}`} highlight='red'>
          {count(value.activities)} Activities
        </Item>
        <Item href={`/search/my-activities/${query}`} highlight='green'>
          {count(value.my_activities)} My Activities
        </Item>
        <Item href={`/search/boards/${query}`} highlight='blue'>
          {count(value.boards)} Boards
        </Item>
        <Item href={`/search/people/${query}`} highlight='yellow'>
          {count(value.people)} People
        </Item>
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
    <Text color='grey_medium'>{n}&nbsp;</Text>
  )
}

/**
 * Nav items
 */

function Item ({props, children}) {
  const {highlight} = props

  return (
    <Block px={10}>
      <Link
        display='inline-block'
        fs='xxs'
        px={15}
        uppercase
        h={46}
        lh='46px'
        textAlign='center'
        borderBottom='3px solid transparent'
        transition='all 0.2s'
        currentProps={{borderBottomColor: highlight}}
        hoverProps={{borderBottomColor: highlight}}
        {...props}>
        {children}
      </Link>
    </Block>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  counts: `/search/counts?query=${props.query}`
}), {
  render
})
