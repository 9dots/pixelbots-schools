/**
 * Imports
 */

import * as colors from 'lib/colors'
import {xs} from './font-sizes'
import rgba from '@f/rgba'

/**
 * Style mixins
 */

function pointer () {
  return {
    cursor: pointer,
    userSelect: 'none'
  }
}

function btn (bg = '#363D43', color = false) {
  if (colors[bg]) bg = colors[bg]
  if (bg === colors.red) color = '#FFF'
  if (!color) color = isLight(bg) ? '#333' : '#FFF'

  return {
    ...pointer(),
    display: 'inline-block',
    color: rgba(color, 0.85),
    backgroundColor: bg,
    transition: 'background-color .3s, color .3s',
    padding: '0px 25px',
    marginBottom: 0,
    height: '2.3em',
    fontSize: xs,
    lineHeight: '2.1em',
    textAlign: 'center',
    borderRadius: 3,
    whiteSpace: 'nowrap',
    outline: 0,
    '&.rounded': {
      borderRadius: 50
    },
    '&.hover, &.focus, &[aria-expanded=true]': {
      color: rgba(color, 1)
    },
    '&:focus': {
      border: '1px solid ' + rgba(0, 0, 0, 0.15)
    },
    '&:active, &.active': {
      backgroundImage: 'none',
      color,
      borderColor: rgba(0, 0, 0, 0.06),
      backgroundColor: bg
    }
  }
}

function circle (size) {
  return {
    height: size,
    width: size,
    borderRadius: '50%',
    textAlign: 'center'
  }
}

function rect (width, height = width) {
  return {
    width,
    height
  }
}

function link (color = colors.text_color) {
  return {
    color: rgba(color, 0.85),
    ...pointer(),
    textDecoration: 'underline',
    transition: 'color .3s',
    '&:hover': {
      color: rgba(color, 1)
    },
    '&:active': {
      color: rgba(color, 0.85)
    }
  }
}

/**
 * Exports
 */

export {
  pointer,
  btn,
  circle,
  rect,
  link
}
