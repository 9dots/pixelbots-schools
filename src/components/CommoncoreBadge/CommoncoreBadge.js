/**
 * Imports
 */

import {Tooltip} from 'vdux-containers'
import element from 'vdux/element'

const cloudFS = require('cloud-fs')
const badge = cloudFS.url('./ccbadge30x30.png')

/**
 * commoncoreBadge
 */

function render ({props}) {
  return (
    <Tooltip message='Common Core Aligned' {...props}>
      <img src={badge} />
    </Tooltip>
  )
}

/**
 * Exports
 */

export default {
  render
}
