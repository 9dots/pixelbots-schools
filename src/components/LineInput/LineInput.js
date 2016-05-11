/**
 * Imports
 */

import {Input} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <LineInput/>
 */

function render ({props}) {
  return <Input
    wide
    inputProps={inputProps}
    {...props} />
}

/**
 * Input styling
 */

const inputProps = {
  p: '6px 0 7px',
  borderWidth: '0 0 1px 0',
  color: '#666',
  fs: '13px',
  outline: 0,
  bgColor: 'transparent'
}

/**
 * Exports
 */

export default {
  render
}
