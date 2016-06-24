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
  const {
    page, numPages, asPercent,
    exportAll, next, prev, togglePref
  } = props
  const navProps = {
    hoverProps: {highlight: 0.02},
    focusProps: {highlight: 0.02},
    bgColor: 'white',
    userSelect: 'none',
    boxShadow: 'z2',
    color: 'text',
    circle: 34,
    p: 0
  }
  return (
    <Block align='space-between center' relative mb>
      <Dropdown btn={<DropButton />} z='3' left w='160px' fs='xxs'>
        <MenuItem onClick={() => togglePref(asPercent)} py>
          Display as {asPercent ? ' Point Totals' : ' Percentages'}
        </MenuItem>
        <MenuItem py align='start center' onClick={exportAll}>
          Export to CSV
          <Icon name='file_download' fs='xs' ml='s' />
        </MenuItem>
      </Dropdown>
      <Block align='start center'>
        <Button mr='s' {...navProps} onClick={prev} disabled={page === 0}>
          <Icon name='keyboard_arrow_left' ml={-2} />
        </Button>
        <Button {...navProps} onClick={next} disabled={page+1 === numPages}>
          <Icon name='keyboard_arrow_right' mr={-2} />
        </Button>
      </Block>
    </Block>
  )
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

export default summon(() => ({
  togglePref: (pref) => ({
    savingPreference:  {
      url: '/preference/gradebook.displayPercent',
      invalidates: '/user',
      method: 'PUT',
      body: {
        value: !pref
      }
    }
  })
}))({
  render
})