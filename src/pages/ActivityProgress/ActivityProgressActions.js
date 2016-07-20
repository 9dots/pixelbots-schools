/**
 * Imports
 */

import ClassActivityBadge from 'components/ClassActivityBadge'
import {Button, Dropdown, MenuItem} from 'vdux-containers'
import ActivityLinkModal from 'modals/ActivityLinkModal'
import {Block, Flex, Icon} from 'vdux-ui'
import {openModal} from 'reducer/modal'
import {invalidate} from 'vdux-summon'
import element from 'vdux/element'


/**
 * Render
 */

function render ({props}) {
  const {activity, setStatus, settingStatus = {}, selected} = props
  const {loading} = settingStatus
  const iconProps ={
    bgColor: 'white',
    activeProps: {bgColor: 'rgba(black, .1)'},
    color: 'text',
    circle: '32',
    fs: 'm'
  }

  const disabled = loading || !selected.length
  return (
    <Flex align='space-between center' mb>
      <Block align='start center'>
        <Button busy={loading} disabled={disabled} text='Return' h={32} onClick={() => doAction('returned')} />
        <Block mx>
        <Dropdown disabled={disabled} btn={<Button disabled={disabled} icon='more_vert' {...iconProps} />} left w={120}>
          <MenuItem align='start center' onClick={() => doAction('opened')}>
            <Icon name='redo' mr fs='xs' />
            Redo
          </MenuItem>
          <MenuItem align='start center' onClick={() => doAction('turned_in')}>
            <Icon name='file_download' mr fs='xs'/>
            Collect
          </MenuItem>
        </Dropdown>
        </Block>
        <Button icon='link' onClick={() => openModal(() => <ActivityLinkModal activity={activity}/>)} {...iconProps} />
      </Block>
      <Block align='end center'>
        <ClassActivityBadge mt='0' w='175' activity={activity} />
      </Block>
    </Flex>
  )

  function * doAction(status) {
    yield selected.map(id => setStatus(id, status))
  }
}

/**
 * Exports
 */

export default {
  render
}
