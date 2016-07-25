/**
 * Imports
 */

import element from 'vdux/element'
import {Flex} from 'vdux-ui'

const cloudFS = require('cloud-fs')
const logo120 = cloudFS.url('./logo120x120.png')

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
