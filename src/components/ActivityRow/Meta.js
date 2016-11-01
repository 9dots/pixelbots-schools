/**
 * Imports
 */

import {Flex, Text, Block} from 'vdux-containers'
import {component, element} from 'vdux'
import Avatar from 'components/Avatar'
import Link from 'components/Link'
import moment from 'moment'

/**
 * Meta bar
 */

export default component({
  render ({props, actions}) {
    const {activity} = props
    const {pinnedFrom} = activity

    if (!isPublic(activity)) {
      return (
        <Block color='grey_medium' fs='xxs'>
          {`Edited ${moment(activity.updatedAt || activity.createdAt).fromNow()}`}
        </Block>
      )
    }

    const actor = pinnedFrom ? pinnedFrom.actor : activity.actor
    const location = pinnedFrom ? pinnedFrom.board.displayName : actor.displayName
    const message = pinnedFrom ? 'Pinned from' : 'Created by'
    const href = pinnedFrom
      ? `/${actor.username}/board/${pinnedFrom.board.id}/activities`
      : `/${actor.username}`

    return (
      <Flex align='start center'>
        <Avatar pointer mr thumb actor={actor} onClick={actions.goToProfile(actor)}/>
        <Flex column fs='xxs' align='space-around'>
          <Text color='text' mb='xs'>{message}</Text>
          <Link href={href} pointer hoverProps={{underline: true}} fw='bold'>
            {location}
          </Link>
        </Flex>
      </Flex>
    )
  },

  events: {
    * goToProfile ({context}, actor, e) {
      e.stopPropagation()
      context.setUrl(`/${actor.username}`)
    }
  }
})

/**
 * Helpers
 */

function isPublic (activity) {
  return !!(activity.contexts.length && activity.contexts[0].descriptor.id === 'public')
}
