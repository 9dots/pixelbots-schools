/**
 * Imports
 */

import css from 'jss-simple'
import times from '@f/times'
import hyphenate from '@f/hyphenate'

/**
 * Constants
 */

const baseLayout = {
  boxSizing: 'border-box',
  display: 'flex'
}

const hAlign = ['flex-start', 'spaceBetween', 'spaceAround', 'flex-end', 'center']
const vAlign = ['flex-start', 'center', 'flex-end']
const alignments = hAlign.reduce((acc, h) => {
  const hKey = h.replace('flex-', '')
  const hVal = hyphenate(h)

  acc[hKey] = {justifyContent: hVal}
  vAlign.forEach(v => acc[hKey + '_' + v] = ({
    justifyContent: hVal,
    alignItems: v
  }))

  return acc
}, {
  stretch: {
    alignSelf: 'stretch'
  }
})

/**
 * Layout styles
 */

const layoutStyle = {
  column: {
    ...baseLayout,
    flexDirection: 'column'
  },
  row: {
    ...baseLayout,
    flexDirection: 'row'
  },
  flex: {
    boxSizing: 'border-box',
    flex: 1
  }
}

times(100, t => {
  layoutStyle['flex_' + t] = {
    flex: `1 1 ${t}%`,
    maxWidth: t + '%',
    maxHeight: '100%'
  }
})

const layout = css(layoutStyle)
layout.align = css(alignments)

/**
 * Exports
 */

module.exports = layout
