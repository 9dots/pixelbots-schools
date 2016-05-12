/**
 * Imports
 */

import CommoncoreBadge from 'components/CommoncoreBadge'
import {Flex, Box, Text, Block} from 'vdux-containers'
import Avatar from 'components/Avatar'
import Link from 'components/Link'
import element from 'vdux/element'
import filter from '@f/filter'
import moment from 'moment'
import map from '@f/map'

/**
 * Meta bar
 */

function render ({props}) {
  const {activity} = props
  const {actor, pinnedFrom} = activity

  if (!isPublic(activity)) {
    return (
      <Block color='grey_medium' fs='xxs'>
        {`Edited ${moment(activity.updatedAt).fromNow()}`}
      </Block>
    )
  }

  const href = pinnedFrom ? `/` : `/${actor.username}/boards`
  const location = pinnedFrom ? pinnedFrom.displayName : actor.displayName
  const message = pinnedFrom ? 'Pinned from' : 'Created by'

  return (
    <Flex align='start center'>
      <Avatar mr actor={actor} />
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

function isPublic (activity) {
  return !!(activity.contexts.length && activity.contexts[0].descriptor.id === 'public')
}

/**
 * Exports
 */

export default {
  render
}
