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
    <EmptyState icon='favorite' color='red'>
      {
        isMe
        ? <Block>
            <Text bold>You </Text> haven't liked any activities yet.
            <Block fs='xs' mt lh='20px' fw='normal'>
              Go <Link color='blue' href='/connect'>connect</Link> with teachers similar to you.  Find activities you like and click the heart icon to save them here!
            </Block>
          </Block>
        : <Block>
            <Text bold>{props.user.displayName} </Text> hasn't liked any activities yet.
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
