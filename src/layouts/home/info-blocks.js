/**
 * Imports
 */

import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Styles
 */

const {info_blocks, col_main} = css({
  info_blocks: {

  },
  col_main: {
    maxWidth: 1100,
    margin: '0 auto'
  }
})

/**
 * Render
 */

function render () {
  return (
    <div id='info' class={info_blocks}>
      <div class={col_main}></div>
    </div>
  )
}

/**
 * Exports
 */

export default render
