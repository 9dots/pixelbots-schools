/**
 * Imports
 */

import summonChannels from 'lib/summon-channels'
import ClassActivityRow from 'components/ClassActivityRow'
import PageTitle from 'components/PageTitle'
import RowFeed from 'components/RowFeed'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <FeedStudent/>
 */

function render ({props}) {
  const {activities, more, currentUser} = props
  const {userType} = currentUser
  const {loaded, value} = activities

  return (
    <Block maxWidth='714px' mt mx='auto' relative>
      <PageTitle title='Weo' />
      <RowFeed {...props} item={ClassActivityRow} />
    </Block>
  )
}

/**
 * Exports
 */

export default summonChannels(({currentUser}) =>
  currentUser.groups
    .filter(group => group.groupType === 'class')
    .map(cls => `group!${cls.id}.board`)
)({
  render
})
