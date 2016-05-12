/**
 * Imports
 */

import {Block, Menu, MenuItem, Icon, Card, Flex, Text} from 'vdux-ui'
import NavTile from 'components/NavTile'
import {Button} from 'vdux-containers'
import Avatar from 'components/Avatar'
import Link from 'components/Link'
import element from 'vdux/element'
import Tooltip from 'vdux-tooltip'

/**
 * Profile Layout Header
 */

function render ({props}) {
  const {user} = props
  const {
    displayName, username, website,
    aboutMe, gradeLevels = [], subjects = [],
    location, following, followers
  } = user

  return (
    <Card wide relative>
      <Flex p>
        <Avatar mr='m' actor={user} w='18%' h='auto' alignSelf='center' />
        <Flex column flex='60%'>
          <Flex p={4} ml={-4} fw='lighter' fs='m' align='start center'>
            <Text capitalize>{displayName}</Text>
            <Text px='s'>&middot;</Text>
            <Text fs='s' color='blue'>{username}</Text>
          </Flex>
          <Flex p={4} color='grey_medium' fs='xs' align='start center'>
            <Tooltip tag='div' message={website} mr='m' align='start center' hide={!website} target='_blank' pointer tag='a' href={website}>
              <Icon fs='inherit' name='language' mr='s' />
              <Text ellipsis>{website}</Text>
            </Tooltip>
            <Tooltip message={location} tag='div' maxWidth='25%' mr='m' hide={!location} align='start center'>
              <Icon fs='inherit' name='place' mr='s' />
              <Text ellipsis>{location}</Text>
            </Tooltip>
            <Tooltip message={gradeLevels.join(', ')} tag='div' maxWidth='25%' mr='m' align='start center' hide={!gradeLevels.length}>
              <Icon fs='inherit' name='school' mr='s' />
              <Text ellipsis>{gradeLevels.join(', ')}</Text>
            </Tooltip>
            <Tooltip message={subjects.join(', ')} tag='div' maxWidth='25%' mr='m' align='start center' hide={!subjects.length}>
              <Icon fs='inherit' name='class' mr='s' />
              <Text ellipsis>{subjects.join(', ')}</Text>
            </Tooltip>
          </Flex>
          <Block color='grey' mt='m'>
            {aboutMe}
          </Block>
        </Flex>
        <Flex absolute='top 12px right 12px'>
          <Button align='center center' tag='div' circle='30' bgColor={user.color} hoverProps={{text: <Icon fs='s' name='colorize' />}} />
          <Button uppercase ml='m' color='grey_medium' border='grey_medium' borderWidth='1px' bgColor='white' hoverProps={{highlight: 0.01}} focusProps={{highlight: 0.01}}>
            Edit Profile
          </Button>
        </Flex>
      </Flex>
      <Flex fs='xxs' align='center center' h='46px' bgColor='off_white' uppercase>
        <NavTile highlight='red' href={`/${username}/boards`}>Boards</NavTile>
        <NavTile highlight='green'>Likes</NavTile>
        <NavTile highlight='blue'>
          <Text mr={3} weight='bolder' fs='xs'>{following}</Text>
          Following
        </NavTile>
        <NavTile highlight='yellow'>
          <Text mr={3} weight='bolder' fs='xs'>{followers}</Text>
          Followers
        </NavTile>
        <NavTile highlight='grey_medium'>Stream</NavTile>
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
