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
    borderStyle='solid'
    borderWidth='0 0 1px 0'
    pb='1px'
    borderColor='gray'
    focusProps={{
      borderBottomWidth: '2px',
      borderColor: 'blue',
      pb: '0'
    }}
    {...props} />
}

/**
 * Input styling
 */

const inputProps = {
  borderWidth: 0,
  p: '6px 0 7px',
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
