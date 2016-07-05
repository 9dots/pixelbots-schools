/**
 * Imports
 */

import {Button, Dropdown, MenuItem} from 'vdux-containers'
import {Icon, Flex, Block, Text} from 'vdux-ui'
import {setUrl} from 'redux-effects-location'
import AssignModal from 'modals/AssignModal'
import {openModal} from 'reducer/modal'
import Confirm from 'modals/Confirm'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * getProps
 */

function getProps (props, {currentUrl}) {
  props.isCurrent = currentUrl.indexOf(props.activity._id) !== -1
  return props
}

/**
 * <ActivityDropdownMenu/>
 */

function render ({props}) {
  const {activity, isCurrent} = props
  const editUrl = `/activity/${activity._id}/edit`

  return (
    <Dropdown btn={<Btn />} w={150}>
      <Item
        onClick={() => openModal(() => <AssignModal activity={activity} />)}
        isCurrent={isCurrent}
        text='Reassign'
        color='green'
        icon='send' />
      <Item onClick={() => setUrl(editUrl)}
        isCurrent={isCurrent}
        text='Edit'
        color='blue'
        icon='edit'/>
      <Item onClick={deleteActivity}
        isCurrent={isCurrent}
        icon='delete'
        text='Delete'
        color='red' />
    </Dropdown>
  )

  function deleteActivity () {
    return openModal(() =>
      <DeleteActivity
        activityId={activity._id}
        redirect={isCurrent && '/feed'}
        message={<Block>Are you sure you want to delete <Text bold color='blue'> {activity.displayName}</Text>?</Block>} />
      )
  }

}

function Item ({props}) {
  const {icon, color, text, onClick, isCurrent} = props
  return (
    <MenuItem align='start center' onClick={click([e => e.stopPropagation(), onClick])}>
      <Icon name={icon} color={color} fs='s' mr />{text}
    </MenuItem>
  )

  function click (actions) {
    return isCurrent ? actions[1] : actions
  }
}

function Btn() {
  return (
    <Button icon='more_vert' color='text' fs='m' circle={32} bgColor='white' activeProps={{highlight: 0.09}} focusProps={{highlight: 0.09}} ml='s' hoverProps={{highlight: 0}}/>
  )
}


const DeleteActivity = summon(({activityId}) => ({
  onAccept: () => ({
    deleting: {
      url: `/share/${activityId}`,
      method: 'DELETE',
      invalidates: ['activity_feed']
    }
  })
}))(Confirm)

/**
 * Exports
 */

export default {
  getProps,
  render
}
