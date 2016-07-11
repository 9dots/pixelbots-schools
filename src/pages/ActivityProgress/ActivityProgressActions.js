/**
 * Imports
 */

import ClassActivityBadge from 'components/ClassActivityBadge'
import {Button, Dropdown, MenuItem} from 'vdux-containers'
import ActivityLinkModal from 'modals/ActivityLinkModal'
import {openModal} from 'reducer/modal'
import {Block, Flex, Icon} from 'vdux-ui'
import element from 'vdux/element'


/**
 * Render
 */

function render ({props}) {
  const {activity, classId} = props
  const iconProps ={
    color: 'text',
    fs: 'm',
    circle: '32',
    activeProps: {bgColor: 'rgba(black, .1)'}
  }
  return (
    <Flex align='space-between center' mb>
      <Block align='start center'>
        <Button text='Return' h={32} />
        <Block mx>
        <Dropdown btn={<Button icon='more_vert' {...iconProps} />} left w={120}>
          <MenuItem align='start center'>
            <Icon name='redo' mr fs='xs' />
            Redo
          </MenuItem>
          <MenuItem align='start center'>
            <Icon name='file_download' mr fs='xs'/>
            Collect
          </MenuItem>
        </Dropdown>
        </Block>
        <Button icon='link' onClick={() => openModal(() => <ActivityLinkModal activity={activity} classId={classId}/>)} {...iconProps} />
      </Block>
      <Block align='end center'>
        <ClassActivityBadge mt='0' w='175' activity={activity} />
      </Block>
    </Flex>
  )
}

/**
 * Exports
 */

export default {
  render
}
