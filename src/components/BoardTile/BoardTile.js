/**
 * Imports
 */

import FollowButton from 'components/FollowButton'
import {Block, Card, Flex, Text} from 'vdux-ui'
import WeoIcon from 'components/WeoIcon'
import {Button} from 'vdux-containers'
import Avatar from 'components/Avatar'
import BgImg from 'components/BgImg'
import element from 'vdux/element'

/**
 * <BoardTile/>
 */

function render ({props}) {
  const {board, currentUser} = props
  const {owners = [], displayName, images = []} = board
  const [owner = {}] = owners

  return (
    <Card w={230} h={250} relative my={8} mx={6} pointer>
      <Flex column tall>
        <Flex p='m' align='start center'>
          <Avatar actor={owner} size={40} />
          <Flex column ml='m'>
            <Text bold mb='xs'>{displayName}</Text>
            <Text color='grey_medium'>by {owner.displayName}</Text>
          </Flex>
        </Flex>
        <Flex wrap h={144} bgColor='off_white' borderColor='rgba(75,82,87,0.03)' borderBottom borderTop>
          <Text hide={images.length} p fs='xxs'>
            <Text fw='bolder'>{displayName}</Text>
            <Text px='xs'>by</Text>
            <Text color='blue'>{owner.displayName}</Text>
          </Text>
          {
            images.map(img => <BgImg flex='50%' maxWidth='100%' img={img} thumb />)
          }
        </Flex>
        <Flex h='42px' p='s' align='space-between center'>
          {
            currentUser._id === owner.id
              ? <Button onClick={'test'} color='midgray' px='l' bgColor='off_white' border='1px solid rgba(0,0,0,0.15)' hoverProps={{highlight: 0.03}} focusProps={{highlight: 0.03}}>Edit</Button>
              : <FollowButton board={board} />
          }
          <Block color='grey_medium' lh='30px'>
            <WeoIcon name='pin' fs='14px' />
            <Text fs='xxs'>
              {board.board && board.board.canonicalTotal.items}
            </Text>
          </Block>
        </Flex>
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
