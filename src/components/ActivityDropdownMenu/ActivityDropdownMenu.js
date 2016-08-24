/**
 * Imports
 */

import DeleteActivityModal from 'modals/DeleteActivityModal'
import {Button, Dropdown, MenuItem} from 'vdux-containers'
import {Icon, Flex, Block, Text} from 'vdux-ui'
import {setUrl} from 'redux-effects-location'
import AssignModal from 'modals/AssignModal'
import {openModal} from 'reducer/modal'
import element from 'vdux/element'

/**
 * <ActivityDropdownMenu/>
 */

function render ({props}) {
  const {activity, onDelete, onClick, reassign = true, ...rest} = props
  const editUrl = `/activity/${activity._id}/edit`

  return (
    <Dropdown btn={<Btn {...rest} />} w={150}>
      <Item
        onClick={() => openModal(() => <AssignModal activity={activity} />)}
        text='Reassign'
        hide={!reassign}
        color='green'
        icon='send' />
      <Item onClick={() => setUrl(editUrl)}
        text='Edit'
        color='blue'
        icon='edit'/>
      <Item
        onClick={() => openModal(() => <DeleteActivityModal onDelete={onDelete} activity={activity} />)}
        icon='delete'
        text='Delete'
        color='red' />
    </Dropdown>
  )
}

function Item ({props}) {
  const {icon, color, text, ...rest} = props
  return (
    <MenuItem align='start center' {...rest}>
      <Icon name={icon} color={color} fs='s' mr />{text}
    </MenuItem>
  )
}

function Btn({props}) {
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
      ml='s'/>
  )
}




/**
 * Exports
 */

export default {
  render
}
