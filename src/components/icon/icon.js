/**
 * Imports
 */

import element from 'vdux/element'

/**
 * Icon
 */

function render ({props}) {
  return (
    <md-icon {...props} class={['material-icons', props.class]}>
      {props.name}
    </md-icon>
  )
}

/**
 * Exports
 */

export default {
  render
}
