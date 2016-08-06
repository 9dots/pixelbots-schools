/**
 * Imports
 */

import {Dropdown, Button, MenuItem} from 'vdux-containers'
import {Block, Icon} from 'vdux-ui'
import summon from 'vdux-summon'
import element from 'vdux/element'

/**
 * Render
 */

function render ({props}) {
  const {page, numPages, asPercent, exportAll, next, prev, setPref} = props
  const navProps = {
    hoverProps: {highlight: 0.02},
    focusProps: {highlight: 0.02},
    userSelect: 'none',
    bgColor: 'white',
    boxShadow: 'z1',
    color: 'text',
    circle: 36,
    p: 0
  }

  return (
    <Block align='space-between center' relative mb>
      <Dropdown btn={<DropButton />} z='3' left w='160px' fs='xxs'>
        <MenuItem onClick={togglePref} py>
          Display as {asPercent ? ' Point Totals' : ' Percentages'}
        </MenuItem>
        <MenuItem py align='start center' onClick={exportAll}>
          Export to CSV
          <Icon name='file_download' fs='xs' ml='s' />
        </MenuItem>
      </Dropdown>
      <Block align='start center'>
        <Button mr {...navProps} onClick={prev} disabled={page === 0}>
          <Icon name='navigate_before' fs={19} />
        </Button>
        <Button {...navProps} onClick={next} disabled={page+1 === numPages}>
          <Icon name='navigate_next' fs={19} />
        </Button>
      </Block>
    </Block>
  )

  function togglePref () {
    return setPref('gradebook.displayPercent', !asPercent)
  }
}

function DropButton () {
  return (
    <Button bgColor='green' h={32}>
      <Icon name='settings' fs='xs' mr='s' />
      Settings
      <Icon name='arrow_drop_down' fs='s' ml='s' mr='-12px' />
    </Button>
  )
}

/**
 * Export
 */

export default {
  render
}
