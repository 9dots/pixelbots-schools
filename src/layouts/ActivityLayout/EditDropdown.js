/**
 * Imports
 */

import DeleteActivityModal from 'modals/DeleteActivityModal'
import {Button, Dropdown, MenuItem} from 'vdux-containers'
import {setUrl, back} from 'redux-effects-location'
import {toast, hideToast} from 'reducer/toast'
import AssignModal from 'modals/AssignModal'
import {Block, Icon, Toast} from 'vdux-ui'
import WeoIcon from 'components/WeoIcon'
import {openModal} from 'reducer/modal'
import PinModal from 'modals/PinModal'
import element from 'vdux/element'
import Link from 'components/Link'
import summon from 'vdux-summon'
import sleep from '@f/sleep'


/**
 * EditDropdown
 */

function render({props}) {
  const {activity, saveDraft, onAction, user, ...rest} = props

  return (
    <Block align='start center' {...rest}>
      <Button
        onClick={() => openModal(() => <PinModal user={user} onPin={id => onAction('pin', id)} activity={activity} />)}
        borderRadius='99px 0 0 99px'
        text='Save Activity'
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
          onClick={draft}
          weoIcon='drafts'
          text='Save to Drafts'
          color='yellow' />
        <Item
          onClick={() => openModal(() => <DeleteActivityModal onDelete={() => onAction('delete')} activity={activity} />)}
          icon='delete'
          text='Delete Activity'
          color='red' />
      </Dropdown>
    </Block>
  )

  function * draft () {
    yield saveDraft()

    yield back(true)

    yield toast(
      <Toast key='a'>
        <Block align='space-between center'>
          <Block>
            Saved to <Link onClick={hideToast} href={`/${user.username}/boards/drafts`} color='blue'>Drafts</Link>
          </Block>
          <Button onClick={[() => setUrl(`/${user.username}/boards/drafts`), hideToast]} bgColor='green'>Go to Drafts</Button>
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
      url: `/share/${activity._id}/draft`,
      method: 'PUT'
    }
  })
}))({
  render
})
