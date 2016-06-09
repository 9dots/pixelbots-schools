/**
 * Imports
 */

import ClassActivityRow from 'components/ClassActivityRow'
import summonChannels from 'lib/summon-channels'
import EmptyClassFeed from './EmptyClassFeed'
import PageTitle from 'components/PageTitle'
import RowFeed from 'components/RowFeed'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <ClassFeed/> Page
 */

function render ({props}) {
  const {activities, group} = props
  return (
    <Block maxWidth='714px' mx='auto' relative>
      <PageTitle title={`${group.displayName} | Feed`} />
      {
        <RowFeed {...props} item={ClassActivityRow} emptyState={<EmptyClassFeed />} />
      }
    </Block>
  )
}

/**
 * Exports
 */

export default summonChannels(({group}) => `group!${group._id}.board`)({
  render
})
