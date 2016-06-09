/**
 * Imports
 */

import EmptyState from 'components/EmptyState'
import {Block, Text} from 'vdux-ui'
import Link from 'components/Link'
import element from 'vdux/element'

/**
 * EmptyProfileLikes
 */

function render({props}) {
  const {me, user} = props
  const isMe = me._id === user._id
  return (
    <EmptyState icon='cast' color='grey_medium'>
      {
        isMe
          ? <Block>
              <Text bold>You </Text> don't have any events to show yet.
            </Block>
          : <Block>
              <Text bold>{user.displayName} </Text> doesn't have any events to show yet.
            </Block>
      }
    </EmptyState>
  )
}

/**
 * Exports
 */

export default {
  render
}