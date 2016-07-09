/**
 * Imports
 */

import element from 'vdux/element'
import {Block, Spinner} from 'vdux-ui'

/**
 * <Loading/>
 */

function render ({props}) {
  const {show, dark = true} = props
  return (
    <Block align='center center' hide={!show} {...props}>
      <Spinner circle='18' dark={dark} />
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
