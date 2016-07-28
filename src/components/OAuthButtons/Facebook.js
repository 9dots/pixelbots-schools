/**
 * Imports
 */

import {Button} from 'vdux-containers'
import {IconButton} from 'vdux-ui'
import element from 'vdux/element'

const cloudFS = require('cloud-fs')
const fbIcon = cloudFS.url('./fbIcon.png')

/**
 * Facebook OAuth Button
 */

function render ({props, children}) {
  return (
    <Button ui={IconButton} fs='12px' img={fbIcon} logoSize='18px' pl='8px' bgColor='facebook_blue' {...props}>
      {children}
    </Button>
  )
}

/**
 * Exports
 */

export default {
  render
}
