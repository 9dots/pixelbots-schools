/**
 * Imports
 */

import element from 'vdux/element'
import {Input} from 'vdux-ui'

/**
 * <BlockInput/>
 */

function render ({props}) {
  return <Input
    wide
    mb='s'
    inputProps={{
      py: 12,
      px: 14,
      borderWidth: 0,
      color: '#666',
      fs: '13px',
      outline: 0,
      bgColor: '#ececec'
    }}
    {...props} />
}

/**
 * Exports
 */

export default {
  render
}
