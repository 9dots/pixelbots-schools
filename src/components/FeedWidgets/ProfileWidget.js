/**
 * Imports
 */

import {Text, Block, Flex, Card} from 'vdux-ui'
import element from 'vdux/element'
import Avatar from 'components/Avatar'

function render ({props}) {
  return (
    <Card {...props}>
      <Block bg='blue' h='60'/>
      <Flex p='s'>
        <Avatar circle='75px' actor={{id: 1}} m='-37.5px 6px 0 0' boxShadow='card' border='2px solid white'/>
        <Block flex overflow='hidden'>
          <Text tag='div' ellipsis fw='bolder'>Full Name and other stuff and things and stuff</Text>
          <Text ellsipis color='midgray' fs='xxs'>Username</Text>
        </Block>
      </Flex>
      <Flex py='s' px color='blue' fw='bolder'>
        <Block flex='30%'>
          <Block>Pins</Block>
          <Block>XX</Block>
        </Block>
        <Block flex='40%'>
          <Block>Following</Block>
          <Block>XX</Block>
        </Block>
        <Block flex='40%'>
          <Block>Followers</Block>
          <Block>XX</Block>
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
