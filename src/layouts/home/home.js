/**
 * Imports
 */

import FloatingArrow from './floating-arrow'
import InfoBlocks from './info-blocks'
import {row, align} from 'lib/layout'
import element from 'vdux/element'
import {chalk} from 'lib/assets'
import {tall} from 'lib/styles'
import Header from './header'
import css from 'jss-simple'

/**
 * Style
 */

const {frame, inner} = css({
  frame: {
    backgroundColor: '#fdfdfd'
  },
  inner: {
    background: `url(${chalk})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center bottom',
    position: 'absolute',
    height: '100vh',
    width: '100%'
  }
})

/**
 * Home Layout
 */

function render ({props, children}) {
  const {action} = props

  return (
    <div class={frame}>
      <Header action={action} />
      <div class={[tall, inner, row, align.center_center]}>
        {children}
        <FloatingArrow />
      </div>
      <InfoBlocks />
    </div>
  )
}

/**
 * Exports
 */

export default {
  render
}
