/**
 * Imports
 */

import logo120 from './logo120x120.png'
import element from 'vdux/element'
import {Flex} from 'vdux-ui'

/**
 * <HomeOwl/>
 */

function render ({props}) {
  const {link = true, width = 28, ...rest} = props
  let owlProps = {}
  if (link)
    owlProps = {
      tag: 'a',
      href: '/'
    }

  return (
    <Flex align='start center' w={width} {...owlProps} {...rest}>
      <img src={logo120} width={width} />
    </Flex>
  )
}

/**
 * Exports
 */

export default {
  render
}
