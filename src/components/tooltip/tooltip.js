/**
 * Imports
 */

import * as colors from 'lib/colors'
import Tooltip from 'vdux-tooltip'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Tooltip
 */

function render ({path, props, children}) {
  const {message, placement = 'top'} = props
  const msgWithArrow = [
    <div class={[arrow, arrows[placement]]}></div>,
    <div class={inner}>{message}</div>
  ]

  return (
    <Tooltip
      {...props}
      placement={placement}
      message={msgWithArrow}
      class={[props.class, tooltip, places[placement]]}>
      {children}
    </Tooltip>
  )
}

/**
 * Style
 */

const color = colors.black
const width = '6px'

const {tooltip, arrow, inner} = css({
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderColor: 'transparent',
    borderStyle: 'solid'
  },
  tooltip: {
    whiteSpace: 'nowrap',
    marginTop: '-3px',
    padding: `${width} 0`
  },
  inner: {
    backgroundColor: color,
    color: colors.white,
    padding: '6px 9px',
    maxWidth: 200,
    color: colors.white,
    textDecoration: 'none',
    borderRadius: '2px',
    whiteSpace: 'nowrap'
  }
})

const arrows = css({
  top: {
    bottom: 0,
    left: '50%',
    marginLeft: `-${width}`,
    borderWidth: `${width} ${width} 0`,
    borderTopColor: color
  },
  bottom: {
    top: 0,
    left: '50%',
    marginLeft: `-${width}`,
    borderWidth: `0 ${width} ${width}`,
    borderBottomColor: color
  },
  right: {
    top: '50%',
    left: 0,
    marginTop: `-${width}`,
    borderWidth: `${width} ${width} ${width} 0`,
    borderRightColor: color
  },
  left: {
    top: '50%',
    right: 0,
    marginTop: `-${width}`,
    borderWidth: `${width} 0 ${width} ${width}`,
    borderLeftColor: color
  }
})

const places = css({
  top: {
    marginTop: -3,
    padding: `${width} 0`
  },
  right: {
    marginLeft: 3,
    padding: `0 ${width}`
  },
  bottom: {
    marginTop: 3,
    padding: `${width} 0`
  },
  left: {
    marginLeft: -3,
    padding: `0 ${width}`
  }
})

/**
 * Exports
 */

export default {
  render
}
