/**
 * Imports
 */

import {Text, Block, Flex, Card} from 'vdux-ui'
import element from 'vdux/element'
import Avatar from 'components/Avatar'

function render ({props}) {
  const {user} = props
  const {displayName, username, color, pinCount, followers, following} = user

  return (
    <Card {...props}>
      <Block bg={color} h='60'/>
      <Flex p='s'>
        <Avatar circle='75px' actor={user} m='-37.5px 6px 0 0' boxShadow='card' border='2px solid white'/>
        <Block flex overflow='hidden'>
          <Text tag='div' ellipsis fw='bolder'>{displayName}</Text>
          <Text ellsipis color='midgray' fs='xxs'>{username}</Text>
        </Block>
      </Flex>
      <Flex py='s' px color='blue' fw='bolder'>
        <Block flex='30%'>
          <Block>Pins</Block>
          <Block>{pinCount}</Block>
        </Block>
        <Block flex='40%'>
          <Block>Following</Block>
          <Block>{following}</Block>
        </Block>
        <Block flex='40%'>
          <Block>Followers</Block>
          <Block>{followers}</Block>
        </Block>
      </Flex>
    </Card>
  )
}

/**
 * Exports
 */

export default {
  render
}
