/**
 * Imports
 */

import * as colors from 'lib/colors'
import element from 'vdux/element'
import {Block} from 'vdux-ui'
import css from 'jss-simple'
import Color from 'color'

/**
 * Constants
 */

const clr = Color(colors.blue).lighten(0.15)

/**
 * <Loading/>
 */

function render ({props}) {
  const {show} = props
  return (
    <Block align='center center' hide={!show} {...props}>
      <Block circle='18' animation='1s pulse ease infinite' />
    </Block>
  )
}

/**
 * Styles
 */

css({
  '@keyframes pulse': {
    from: {
      boxShadow: `0 0 ${rgba(clr)}`,
      background: rgba(clr, .7)
    },
    to: {
      boxShadow: `0 0 0 .45em ${rgba(clr, 0)}`,
      background: rgba(clr)
    }
  }
})

/**
 * Helpers
 */

function rgba (clr, a = 1) {
  return Color(clr).alpha(a).rgbaString()
}

/**
 * Exports
 */

export default {
  render
}
