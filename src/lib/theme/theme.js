/**
 * Imports
 */

import * as colors from 'lib/colors'
import {defaultTheme} from 'vdux-ui'

/**
 * Theme
 */

const theme = {
  colors: {
    ...defaultTheme.colors,
    ...colors
  },
  scale: {
    z: 0,
    xs: 3,
    s: 6,
    m: 12,
    l: 24,
    xl: 32,
    xxl: 64,
    col_xsm: 200,
    col_sm: 360,
    col_med: 440,
    col_med: 440,
    col_lrg: 520,
    col_main: 968
  },
  fontScale: {
    xxs: 11,
    xs: 13,
    s: 17,
    m: 22,
    l: 30,
    xl: 45,
    xxl: 120
  }
}

/**
 * Exports
 */

export default theme
