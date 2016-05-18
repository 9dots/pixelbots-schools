/**
 * Imports
 */

import CommoncoreBadge from 'components/CommoncoreBadge'
import {Flex, Text, Block} from 'vdux-containers'
import {setUrl} from 'redux-effects-location'
import Avatar from 'components/Avatar'
import Link from 'components/Link'
import element from 'vdux/element'
import filter from '@f/filter'
import moment from 'moment'

/**
 * Meta bar
 */

function render ({props}) {
  const {activity} = props
  const {pinnedFrom} = activity

  if (!isPublic(activity)) {
    return (
      <Block color='grey_medium' fs='xxs'>
        {`Edited ${moment(activity.updatedAt).fromNow()}`}
      </Block>
    )
  }

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

function isPublic (activity) {
  return !!(activity.contexts.length && activity.contexts[0].descriptor.id === 'public')
}

/**
 * Exports
 */

export default {
  render
}
