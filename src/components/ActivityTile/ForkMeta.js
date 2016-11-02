/**
 * Imports
 */

import {Flex, Text} from 'vdux-containers'
import {component, element} from 'vdux'
import Avatar from 'components/Avatar'
import Link from 'components/Link'

/**
 * Fork Meta
 */

export default component({
  render ({props, context}) {
    const {activity} = props
    const {pinnedFrom} = activity
    const actor = pinnedFrom ? pinnedFrom.actor : activity.actor
    const location = pinnedFrom ? pinnedFrom.board.displayName : actor.displayName
    const message = pinnedFrom ? 'Pinned from' : 'Created by'
    const href = pinnedFrom
      ? `/${actor.username}/board/${pinnedFrom.board.id}/activities`
      : `/${actor.username}`

    return (
      <Flex align='start center'>
        <Avatar pointer mr thumb actor={actor} onClick={[context.setUrl(`/${actor.username}`), {stopPropagation: true}]} />
        <Flex column fs='xxs' align='space-around'>
          <Text color='text' mb='xs'>{message}</Text>
          <Link href={href} pointer hoverProps={{underline: true}} fw='bold'>
            {location}
          </Link>
        </Flex>
      </Flex>
    )
  }
})
