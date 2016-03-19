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
  scale: [
    0,
    6,
    12,
    24,
    32,
    64
  ],
  fontScale: [
    11,
    13,
    17,
    22,
    30,
    45,
    120
  ]
}

/**
 * Exports
 */

export default theme
