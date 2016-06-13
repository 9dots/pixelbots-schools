/**
 * Imports
 */

import {Flex, Text} from 'vdux-containers'
import {setUrl} from 'redux-effects-location'
import Avatar from 'components/Avatar'
import Link from 'components/Link'
import element from 'vdux/element'

/**
 * Fork Meta
 */

function render ({props}) {
  const {activity} = props
  const {pinnedFrom} = activity
  const actor = pinnedFrom ? pinnedFrom.actor : activity.actor
  const location = pinnedFrom ? pinnedFrom.board.displayName : actor.displayName
  const message = pinnedFrom ? 'Pinned from' : 'Created by'
  const href = pinnedFrom
    ? `/${actor.username}/board/${pinnedFrom.board.id}/activities`
    : `/${actor.username}/boards`

  return (
    <Flex align='start center'>
      <Avatar pointer mr thumb actor={actor} onClick={e => goToProfile(e, actor)}/>
      <Flex column fs='xxs' align='space-around'>
        <Text color='midgray' mb='xs'>{message}</Text>
        <Link href={href} pointer hoverProps={{underline: true}} fw='bold'>
          {location}
        </Link>
      </Flex>
    </Flex>
  )
}

/**
 * Helpers
 */

function goToProfile(e, actor) {
  e.stopPropagation()
  return setUrl(`/${actor.username}/boards`)
}

/**
 * Exports
 */

export default {
  render
}
