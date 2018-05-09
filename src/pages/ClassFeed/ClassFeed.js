/**
 * Imports
 */

import ActivityRowStudent from 'components/ActivityRowStudent'
import ClassActivityRow from 'components/ClassActivityRow'
import PageTitle from 'components/PageTitle'
import MediaModal from 'modals/MediaModal'
import { component, element } from 'vdux'
import { Button } from 'vdux-containers'
import { Block } from 'vdux-ui'
import fire from 'vdux-fire'

/**
 * <ClassFeed/> Page
 */

export default fire(props => ({
  activities: `/feed/${props.groupId}#orderByChild=inverseTimestamp`
}))(
  component({
    render ({ props, context, actions }) {
      const { group, currentUser, activities } = props
      const Item =
        currentUser.userType === 'student'
          ? ActivityRowStudent
          : ClassActivityRow

      if (activities.loading) return <span />

      const value = activities.value || []
      const pinned = value.filter(act => !!act.pinned)
      const unpinned = value.filter(act => !act.pinned)

      return (
        <Block my pb mx='auto' relative>
          <PageTitle title={`${group.displayName} | Feed`} />
          <Button
            mb
            onClick={context.openModal(() => (
              <MediaModal onAccept={actions.assign} />
            ))}>
            Submit a Link
          </Button>
          <Block>
            {pinned.concat(unpinned).map(activity => (
              <Block key={activity.id}>
                <ClassActivityRow options activity={activity} />
              </Block>
            ))}
          </Block>
        </Block>
      )
    },

    controller: {
      * assign ({ props, context }, { url }) {
        if (!url) return

        const { groupId } = props
        const playlistRef = parseRef(url)
        const snap = yield context.firebaseOnce('/playlists/' + playlistRef)
        const playlist = snap.val()

        yield context.firebasePush(`/feed/${groupId}`, {
          playlistRef,
          publishedAt: Date.now(),
          inverseTimestamp: -Date.now(),
          displayName: playlist.name || null,
          description: playlist.description || null,
          image: {
            url: playlist.imageUrl || null
          },
          groupId
        })
      }
    }
  })
)

/**
 * Helpers
 */

function parseRef (url) {
  const parts = url.split('/').filter(Boolean)
  const idx = parts.indexOf('playlist')
  return parts[idx + 1]
}
