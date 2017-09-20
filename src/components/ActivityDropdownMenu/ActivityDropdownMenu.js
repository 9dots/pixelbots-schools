/**
 * Imports
 */

import DeleteActivityModal from 'modals/DeleteActivityModal'
import {Button, Dropdown, MenuItem} from 'vdux-containers'
import AssignModal from 'modals/AssignModal'
import {t, stopPropagation, component, element} from 'vdux'
import WeoIcon from 'components/WeoIcon'
import {Icon, Block} from 'vdux-ui'

/**
 * <ActivityDropdownMenu/>
 */

let close

export default component({
  propTypes: {
    activity: t.Object,
    reassign: t.maybe(t.Boolean),
    onDelete: t.maybe(t.Function)
  },

  render ({props, context, actions}) {
    const {activity, reassign = true, ...rest} = props
    const editUrl = `/activity/${activity._id}/edit`

    console.log(close)

    return (
      <Dropdown 
        btn={<Btn {...rest} />}
        ref={function (api) { close = api.close }}
        w={150}>
        <Item
          onClick={close}
          text='Pin to Top'
          color='green'
          weoicon='pin' />
        {
        // <Item
        //   onClick={actions.openAssignModal}
        //   text='Reassign'
        //   hide={!reassign}
        //   color='green'
        //   icon='send' />
        // <Item onClick={context.setUrl(editUrl)}
        //   text='Edit'
        //   color='blue'
        //   icon='edit' />
        // <Item
        //   onClick={actions.openDeleteModal}
        //   icon='delete'
        //   text='Delete'
        //   color='red' />
        }
      </Dropdown>
    )
  },

  controller: {
    * openAssignModal ({context, props}) {
      yield context.openModal(() => <AssignModal activity={props.activity} />)
    },

    * openDeleteModal ({props, context}) {
      const {onDelete, activity} = props
      yield context.openModal(() => <DeleteActivityModal onDelete={onDelete} activity={activity} />)
    },
    * pin ({props, context}, open) {
      console.log('pin', props.activity)
      // if (!url) return

      // const {groupId} = props
      // const playlistRef = parseRef(url)
      // const snap = yield context.firebaseOnce('/playlists/' + playlistRef)
      // const playlist = snap.val()

      // yield context.firebasePush(`/feed/${groupId}`, {
      //   playlistRef,
      //   publishedAt: new Date(),
      //   inverseTimestamp: -new Date(),
      //   displayName: playlist.name || null,
      //   description: playlist.description || null,
      //   image: {
      //     url: playlist.imageUrl || null
      //   },
      //   groupId
      // })
    }
  }
})

/**
 * <Item/>
 */

function Item ({props}) {
  const {weoicon, icon, color, text, ...rest} = props
  return (
    <MenuItem align='start center' {...rest}>
      <Icon name={icon} color={color} fs='s' mr hide={!icon} />
      <WeoIcon name={weoicon} color={color} fs='s' mr hide={!weoicon} />
      {text}
    </MenuItem>
  )
}

/**
 * <Btn/>
 */

function Btn ({props}) {
  return (
    <Button
      activeProps={{highlight: 0.09}}
      focusProps={{highlight: 0.09}}
      hoverProps={{highlight: 0}}
      hide={props.hide}
      icon='more_vert'
      bgColor='white'
      color='text'
      circle={32}
      fs='m'
      ml='s' />
  )
}
