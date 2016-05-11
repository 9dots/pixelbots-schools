/**
 * Imports
 */

import FollowButton from 'components/FollowButton'
import {Card, Text, Flex, Block, Icon} from 'vdux-ui'
import Avatar from 'components/Avatar'
import element from 'vdux/element'

/**
 * <UserTile/>
 */

function render ({props}) {
  const {user, currentUser} = props
  const {followers, pinCount, username, displayName, gradeLevels = [], subjects = []} = user

  return (
    <Card w={230} h={317} my={8} mx={6}>
      <Block relative>
        <Avatar circle={false} size={null} wide tall actor={user} display='block' />
        {
          !currentUser && <FollowButton m='s' absolute='bottom right' user={user} />
        }
      </Block>
      <Block p='m' whiteSpace='nowrap'>
        <Flex fs='s' fw='lighter' w='100%' align='center'>
          <Text>{displayName}</Text>
          <Text mx='s'>&middot;</Text>
          <Text ellipsis color='grey_medium'>{username}</Text>
        </Flex>
        <Flex align='center' color='blue' my='s' fs='xxs' weight='bolder' ellipsis>
          <Text uppercase>{pinCount} pins</Text>
          <Text mx='s'>&middot;</Text>
          <Text uppercase>{followers} followers</Text>
        </Flex>
        <Flex fs='xxs' color='grey_medium' align='center'>
          <Flex align='start center' hide={gradeLevels.length === 0} ellipsis>
            <Icon fs='14px' name='school' />
            <Text ml='2px' ellipsis>{gradeLevels.join(', ')}</Text>
          </Flex>
          <Text hide={gradeLevels.length === 0 || subjects.length === 0} mx='s'>
            &middot;
          </Text>
          <Flex hide={subjects.length === 0} ellipsis>
            <Icon fs='14px' name='class' />
            <Text ml='2px' ellipsis>{subjects.join(', ')}</Text>
          </Flex>
        </Flex>
      </Block>
    </Card>
  )
}

/**
 * Exports
 */

export default {
  render
}
