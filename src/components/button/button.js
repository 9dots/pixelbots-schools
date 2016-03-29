/**
 * Imports
 */

import Tooltip from 'components/Tooltip'
import element from 'vdux/element'
import Hover from 'vdux-hover'
import theme from 'lib/theme'
import Color from 'color'
import has from '@f/has'

/**
 * Button
 */

function render ({props, children}) {
  const {text, tooltip, ttPlacement, hover = true, bgColor = 'primary'} = props
  const btn = hover => <Button {...props} bgColor={highlight(bgColor, hover)}>{children}</Button>
  const vnode = hover
    ? <Hover>{btn}</Hover>
    : btn(false)

  if (tooltip) {
    return (
      <Tooltip message={tooltip} placement={ttPlacement}>
        {vnode}
      </Tooltip>
    )
  }

  return vnode
}

function highlight (bg, hover) {
  if (!hover) return bg
  if (bg === 'transparent') return bg

  const color = Color(has(bg, theme.colors) ? theme.colors[bg] : bg)

  return color.light()
    ? color.darken(0.1).rgbaString()
    : color.ligten(0.1).rgbaString()
}

/**
 * Exports
 */

export default {
  render
}
