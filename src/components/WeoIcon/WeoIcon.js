/**
 * Imports
 */

import woff from './weo-icons.woff'
import element from 'vdux/element'
import ttf from './weo-icons.ttf'
import svg from './weo-icons.svg'
import eot from './weo-icons.eot'
import {Icon} from 'vdux-ui'
import css from 'jss-simple'

/**
 * WeoIcon
 */

function render ({props}) {
  return <Icon iconClass={weoIcon} {...props} />
}

/**
 * Style
 */

css({
  '@font-face': {
    fontFamily: "'weo-icons'",
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: [
      `url('${eot}')`,
      `url('${eot}?#iefix') format('embedded-opentype')`,
      `url('${woff}') format('woff')`,
      `url('${ttf}') format('truetype')`,
      `url('${svg}') format('svg')`,
    ].join(',')
  }
}, {named: false})

const {weoIcon} = css({
  weoIcon: {
    fontFamily: 'weo-icons',
    lineHeight: 1,
    letterSpacing: 'normal',
    textTransform: 'none',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    wordWrap: 'normal',
    direction: 'ltr',
    fontFeatureSettings: "'liga'",
    '-webkit-font-feature-settings': "'liga'",
    '-webkit-font-smoothing': 'antialiased'
  }
})

/**
 * Exports
 */

export default {
  render
}
