/**
 * Imports
 */

import {Input} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <BlockInput/>
 */

function render ({props}) {
  return <Input
    wide
    mb='s'
    inputProps={inputProps}
    {...props} />
}

/**
 * Input styling
 */

const inputProps = {
  py: 12,
  px: 14,
  borderWidth: 0,
  color: '#666',
  fs: '13px',
  outline: 0,
  bgColor: '#ececec'
}

/**
 * Exports
 */

export default {
  render
}
