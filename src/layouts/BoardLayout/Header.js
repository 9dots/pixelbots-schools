/**
 * Imports
 */

import {Flex, Block, Card, Text} from 'vdux-ui'
import Avatar from 'components/Avatar'
import Link from 'components/Link'
import element from 'vdux/element'

/**
 * Profile Header
 */

function render({props}) {
  const {value} = props
  const {displayName, followers, owners, _id, board} = value
  const url = '/' + owners[0].username + '/board/' + _id
  return (
    <Card>
      <Flex column align='center center'>
        <Block mt='xl' mb fw='bolder' fs='xl'>
          {displayName}
        </Block>
        <Avatar link size='96' actor={owners[0]} border='2px solid white' boxShadow='z1' />
        <Block my fs='s'>
          {owners[0].displayName}
        </Block>
        <Flex align='center center' h={46}>
          <Item href={url + '/activities'} highlight='red' count={board.canonicalTotal.items}>
            Activities
          </Item>
          <Item href={url + '/followers'} highlight='green' count={followers}>
            Followers
          </Item>
        </Flex>
      </Flex>
    </Card>
  )
}

/**
 * Nav Items
 */

function Item ({props, children}) {
  const {highlight, count} = props

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
        <Text color='grey_medium'>{count || 0}&ensp;</Text>
        {children}
      </Link>
    </Block>
  )
}

/**
 * Exports
 */

export default render
