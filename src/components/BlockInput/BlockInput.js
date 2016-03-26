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
    inputStyle={inputStyle}
    inputProps={{m: 'm'}}
    {...props} />
}

/**
 * Styles
 */

const inputStyle = {
  padding: '12px 14px',
  border: 0,
  color: '#666',
  fontSize: '13px',
  fontWeight: 500,
  outline: 0,
  background: '#ececec'
}

/**
 * Exports
 */

export default {
  render
}
