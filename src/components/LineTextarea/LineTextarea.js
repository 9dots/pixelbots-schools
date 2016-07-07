/**
 * Imports
 */

import {Textarea} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <LineTextarea/>
 */

function render ({props}) {
  const {disabled} = props

  return (
    <Textarea
      wide
      fs='xs'
      borderStyle='solid'
      borderWidth='0 0 1px 0'
      p='7px 0 8px'
      borderColor={disabled ? 'grey_light' : 'grey'}
      outline='0'
      bgColor='transparent'
      color='#666'
      focusProps={{
        borderBottomWidth: '2px',
        borderColor: 'blue',
        pb: 0
      }}
      {...props} />
  )
}

/**
 * Exports
 */

export default {
  render
}
