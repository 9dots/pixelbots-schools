/**
 * Imports
 */

import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <ActivityPost/>
 */

function render ({props}) {
  const {object} = props

  return (
    <Block py='l' fs='s' fw='100' lh='1.5em'>
      <Block class='markdown' innerHTML={object.content} />
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
