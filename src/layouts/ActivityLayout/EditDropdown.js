/**
 * Imports
 */

import DeleteActivityModal from 'modals/DeleteActivityModal'
import {Button, Dropdown, MenuItem} from 'vdux-containers'
import {toast, hideToast} from 'reducer/toast'
import AssignModal from 'modals/AssignModal'
import {Block, Icon, Toast} from 'vdux-ui'
import WeoIcon from 'components/WeoIcon'
import {openModal} from 'reducer/modal'
import PinModal from 'modals/PinModal'
import element from 'vdux/element'
import Link from 'components/Link'
import summon from 'vdux-summon'


/**
 * EditDropdown
 */

function render({props}) {
  const {activity, saveDraft, ...rest} = props
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
          onClick={draft}
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

  function * draft () {
    yield saveDraft()
    yield toast(
      <Toast key='a'>
        <Block align='space-between center'>
          <Block>
            Saved to <Link onClick={hideToast} href='/activities/drafts' color='blue'>Drafts</Link>
          </Block>
          <Button onClick={[() => setUrl('/activities/drafts'), hideToast]} bgColor='green'>Go to Drafts</Button>
        </Block>
      </Toast>
    )
  }
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

export default summon(({activity}) => ({
  saveDraft: () => ({
    savingDraft: {
      url: `/share/${activity.id}/draft`,
      method: 'PUT'
    }
  })
}))({
  render
})
