/**
 * Imports
 */

import element from 'vdux/element'
import {align} from 'lib/layout'
import {chalk} from 'lib/assets'
import {tall} from 'lib/styles'
import Header from './header'
import css from 'jss-simple'

/**
 * Style
 */

const style = css({
  frame: {
    background: `url(${chalk})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center bottom',
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
})

/**
 * Home Layout
 */

function render ({props}) {
  const {action, children} = props

  return (
    <div class={style.frame}>
      <Header action={action} />
      <div class={[tall, align.center_center]}>
        {children}
      </div>
    </div>
  )
}

/**
 * Exports
 */

export default {
  render
}
