/**
 * Imports
 */

import {Button} from 'vdux-containers'
import {IconButton} from 'vdux-ui'
import element from 'vdux/element'

const cloudFS = require('cloud-fs')
const gplusIcon = cloudFS.url('./gplusIcon.png')

/**
 * Google OAuth Button
 */

function render ({props, children}) {
  return (
    <Button ui={IconButton} fs='12px' img={gplusIcon} bgColor='google_red' {...props}>
      {children}
    </Button>
  )
}

/**
 * Exports
 */

export default render
