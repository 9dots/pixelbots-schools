/**
 * Imports
 */

import {Button} from 'vdux-containers'
import {IconButton} from 'vdux-ui'
import element from 'vdux/element'

const cloudFS = require('cloud-fs')
const msIcon = cloudFS.url('./office365.png')

/**
 * Facebook OAuth Button
 */

function render ({props, children}) {
  return (
    <Button ui={IconButton} fs='12px' img={msIcon} iconSize='18px' pl='8px' bgColor='white' color='microsoft_red' {...props}>
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
