/**
 * Imports
 */

import DeleteActivityModal from 'modals/DeleteActivityModal'
import {Button, Dropdown, MenuItem} from 'vdux-containers'
import AssignModal from 'modals/AssignModal'
import WeoIcon from 'components/WeoIcon'
import {openModal} from 'reducer/modal'
import PinModal from 'modals/PinModal'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'


/**
 * EditDropdown
 */

function render({props}) {
  const {activity, ...rest} = props
  return (
    <Block align='start center' {...rest}>
      <Button
        onClick={() => openModal(() => <AssignModal activity={activity} />)}
        borderRadius='99px 0 0 99px'
        text='Assign To Class'
        bgColor='green'
        pl={18}
        h={34}
        pr />
      <Dropdown
        btn={
          <Button borderLeftWidth={0} borderRadius='0 99px 99px 0' px='s' h={34} bgColor='green'>
            <Icon name='arrow_drop_down' />
          </Button>
        }
        w={160}>
        <Item
          onClick={() => openModal(() => <PinModal activity={activity} />)}
          weoIcon='pin'
          text='Pin to Board'
          color='blue' />
        <Item
          weoIcon='drafts'
          text='Save to Drafts'
          color='yellow' />
        <Item
          onClick={() => openModal(() => <DeleteActivityModal activity={activity} />)}
          icon='delete'
          text='Delete Activity'
          color='red' />
      </Dropdown>
    </Block>
  )
}

function Item ({props}) {
  const {icon, color, text, weoIcon, ...rest} = props
  return (
    <MenuItem align='start center' {...rest}>
      { weoIcon && <WeoIcon name={weoIcon} color={color} fs='s' mr /> }
      { icon && <Icon name={icon} color={color} fs='s' mr /> }
      {text}
    </MenuItem>
  )
}

/**
 * Exports
 */

export default {
  render
}
