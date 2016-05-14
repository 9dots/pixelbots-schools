/**
 * Imports
 */

import {Flex, Card} from 'vdux-ui'
import {Text, Block} from 'vdux-containers'
import element from 'vdux/element'
import Avatar from 'components/Avatar'
import {setUrl} from 'redux-effects-location'

function render ({props}) {
  const {user} = props
  const {displayName, username, color, pinCount, followers, following} = user

  return (
    <Card {...props}>
      <Block bg={color} h='60'/>
      <Flex p='s'>
        <Avatar circle='75px' actor={user} m='-37.5px 6px 0 0' boxShadow='card' border='2px solid white'/>
        <Block overflow='hidden' >
          <Text ellipsis fw='bolder' pointer onClick={() => setUrl(`/${username}/boards`)} hoverProps={{textDecoration: 'underline'}}>{displayName}</Text>
          <br/>
          <Text ellsipis color='midgray' fs='xxs' pointer onClick={() => setUrl(`/${username}/boards`)} hoverProps={{textDecoration: 'underline'}}>{username}</Text>
        </Block>
      </Flex>
      <Flex py='s' px color='blue' fw='bolder'>
        <Block flex='30%' pointer onClick={() => setUrl(`/${username}/boards`)} hoverProps={{opacity: 0.9}}>
          <Block>Pins</Block>
          <Block>{pinCount}</Block>
        </Block>
        <Block flex='40%' pointer onClick={() => setUrl(`/${username}/following`)} hoverProps={{opacity: 0.9}}>
          <Block>Following</Block>
          <Block>{following}</Block>
        </Block>
        <Block flex='40%' pointer onClick={() => setUrl(`/${username}/followers`)} hoverProps={{opacity: 0.9}}>
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
