/**
 * Imports
 */

import StreamActivity from 'components/StreamActivity'
import summonChannels from 'lib/summon-channels'
import EmptyState from 'components/EmptyState'
import PageTitle from 'components/PageTitle'
import RowFeed from 'components/RowFeed'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <NotificationsFeed/>
 */

function onCreate({props}) {
  return props.markRead()
}

function render ({props}) {
  return (
    <Block>
      <PageTitle title='Notifications | Weo' />
      <RowFeed
        item={StreamActivity}
        w='col_xl'
        mt='l'
        mx='auto'
        {...props}
        search={false}
        emptyState={<EmptyState wide icon='cast' color='red_medium'>You have no notifications</EmptyState>}
         />
        }
    </Block>
  )
}

/**
 * Exports
 */

export default summonChannels(
  ({currentUser}) => `user!${currentUser._id}.notifications`, {
    markRead: () => ({
      markingRead:  {
        url: '/user/notifications',
        invalidates: '/user',
        method: 'DELETE'
      }
  })
})({
  onCreate,
  render
})
