/**
 * Imports
 */

import element from 'vdux/element'
import {logo120} from 'lib/assets'
import {Flex} from 'vdux-ui'

/**
 * <HomeOwl/>
 */

function render ({props}) {
  return (
    <Flex tag='a' align='start center' href='/' {...props}>
      <img src={logo120} width='28' />
    </Flex>
  )
}

/**
 * Exports
 */

export default {
  render
}
