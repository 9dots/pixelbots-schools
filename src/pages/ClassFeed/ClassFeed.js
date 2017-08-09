/**
 * Imports
 */

import ActivityRowStudent from 'components/ActivityRowStudent'
import ClassActivityRow from 'components/ClassActivityRow'
import EmptyClassFeed from './EmptyClassFeed'
import PageTitle from 'components/PageTitle'
import MediaModal from 'modals/MediaModal'
import RowFeed from 'components/RowFeed'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import {Block} from 'vdux-ui'
import fire from 'vdux-fire'

/**
 * <ClassFeed/> Page
 */

export default fire(props => ({
  activities: `/feed/${props.groupId}`
}))(component({
    render ({props, context, actions}) {
      const {group, currentUser, activities} = props
      const Item = currentUser.userType === 'student'
        ? ActivityRowStudent
        : ClassActivityRow

      if (activities.loading) return <span/>

      const value = activities.value || {}

      return (
        <Block my pb mx='auto' relative>
          <Button onClick={context.openModal(() => <MediaModal onAccept={actions.assign} />)}>Submit a Link</Button>
          <PageTitle title={`${group.displayName} | Feed`} />
          <Block>
            {
              Object.keys(value).map(key => (
                <Block>
                  <Block pointer onClick={context.setUrl(`/activity/${key}`)}>
                    {value[key].playlistUrl}
                  </Block>
                </Block>
              ))
            }
          </Block>
        </Block>
      )
    },

    controller: {
      * assign ({props, context}, {url}) {
        const {groupId} = props

        yield context.firebasePush(`/feed/${groupId}`, {
          playlistUrl: url,
          groupId
        })
      }
    }
  }
))
