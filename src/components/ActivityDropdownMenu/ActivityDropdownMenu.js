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

export default component({
  propTypes: {
    activity: t.Object,
    reassign: t.maybe(t.Boolean),
    onDelete: t.maybe(t.Function)
  },

  render ({props, context, actions}) {
    const {activity, pinAction, ...rest} = props
    const editUrl = `/activity/${activity._id}/edit`

    return (
      <Dropdown 
        btn={<Btn {...rest} />}
        w={150}
        z={9999}>
        <Block>
          <Item
            onClick={pinAction}
            text='Pin to Top'
            color='red'
            weoicon='pin' />
          <Item
            onClick={actions.openDeleteModal}
            icon='delete'
            text='Delete'
            color='text' />
        </Block>
      </Dropdown>
    )
  },

  controller: {
    * openAssignModal ({context, props}) {
      yield context.openModal(() => <AssignModal activity={props.activity} />)
    },

    * openDeleteModal ({props, context}) {
      const {deleteAction, activity} = props
      yield context.openModal(() => <DeleteActivityModal onDelete={deleteAction} activity={activity} />)
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
