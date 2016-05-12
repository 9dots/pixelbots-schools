/**
 * Imports
 */

import {Button, CSSContainer, wrap} from 'vdux-containers'
import {Text, MenuItem} from 'vdux-ui'
import element from 'vdux/element'
import {setUrl} from 'redux-effects-location'

function render ({props}) {
  const {showIcon, cls} = props
  const {id, displayName} = cls

  return (
    <MenuItem py='m' px='0' capitalize color='text_color' display='flex' align='start center' {...props} onClick={() => setUrl(`/class/${id}/feed`)}>
      <Text inlineBlock circle='25' lh='25px' mx='m' bg='green' color='white' textAlign='center'>
        {displayName[0]}
      </Text>
      <Text ellipsis capitalize inlineBlock flex>
        {displayName}
      </Text>
      <Button icon='settings' fs='xs' color='midgray' px='m' h='25' hide={!showIcon} opacity={0.7} hoverProps={{opacity: 1}} activeProps={{opacity: 0.7}}/>
    </MenuItem>
  )
}

/**
 * Exports
 */

export default wrap(CSSContainer, {
  hoverProps: {
    showIcon: true,
    highlight: true
  }
})({
  render
})
