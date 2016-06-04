/**
 * Imports
 */

import FollowButton from 'components/FollowButton'
import {Card, Text, Flex, Block, Icon} from 'vdux-ui'
import {setUrl} from 'redux-effects-location'
import Avatar from 'components/Avatar'
import element from 'vdux/element'

/**
 * <UserTile/>
 */

function render ({props}) {
  const {user, currentUser} = props
  const {followers, pinCount, username, displayName, gradeLevels = [], subjects = []} = user
  const isActor = user._id === undefined

  return (
    <Card w={230} my={8} mx={6} pointer onClick={() => setUrl(`/${user.username}/boards`)}>
      <Block relative>
        <Block w='100%' relative>
          <Block pb='100%'>
            <Avatar circle={false} size={null} wide tall actor={user} display='block' absolute top bottom right left m='auto' />
          </Block>
        </Block>
        {
          !currentUser && (
            <Block onClick={e => e.stopPropagation()}>
              <FollowButton m='s' absolute='bottom right' user={user} />
            </Block>
          )
        }
      </Block>
      <Block p='m' whiteSpace='nowrap'>
        <Block fs='s' fw='lighter' w='100%' textAlign='center' ellipsis color='grey_medium' mb='s'>
          <Text color='text'>{displayName}</Text>
          <Text mx='s' color='text'>&middot;</Text>
          <Text>{username}</Text>
        </Block>
        <Block hide={isActor}>
          <Flex align='center' color='blue' mb='s' fs='xxs' weight='bolder' ellipsis>
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
            <Icon fs='14px' name='placeholder' w='0' overflow='hidden'  />
          </Flex>
        </Block>
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
