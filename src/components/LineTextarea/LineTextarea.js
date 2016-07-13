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
      borderColor={disabled ? 'rgba(grey_light, .6)' : 'grey_light'}
      borderWidth='0 0 1px 0'
      bgColor='transparent'
      borderStyle='solid'
      p='7px 0 8px'
      color='#666'
      outline='0'
      fs='xs'
      wide
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
