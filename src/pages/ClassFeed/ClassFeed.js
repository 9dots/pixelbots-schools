/**
 * Imports
 */

import ActivityRowStudent from 'components/ActivityRowStudent'
import ClassActivityRow from 'components/ClassActivityRow'
import summonChannels from 'lib/summon-channels'
import EmptyClassFeed from './EmptyClassFeed'
import PageTitle from 'components/PageTitle'
import MediaModal from 'modals/MediaModal'
import RowFeed from 'components/RowFeed'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import {Block} from 'vdux-ui'
import live from 'lib/live'

/**
 * <ClassFeed/> Page
 */

export default summonChannels(({group}) => `group!${group._id}.board`, ({group}) => ({
  assignLink: object => ({
    assigning: {
      url: `/share/link?to=${group._id}`,
      method: 'POST',
      body: {
        url: object.originalContent
      }
    }
  })
}))(
  live(({group}) => ({
    activities: {
      url: '/share',
      params: {
        channel: `group!${group._id}.board`
      }
    }
  }))(component({
    render ({props, context}) {
      const {group, assignLink, currentUser} = props
      const Item = currentUser.userType === 'student'
        ? ActivityRowStudent
        : ClassActivityRow

      return (
        <Block my pb mx='auto' relative>
          <Button onClick={context.openModal(() => <MediaModal onAccept={assignLink} />)}>Submit a Link</Button>
          <PageTitle title={`${group.displayName} | Feed`} />
          {
            <RowFeed {...props} item={Item} emptyState={<EmptyClassFeed currentUser={currentUser} />} />
          }
        </Block>
      )
    }
  }
)))
