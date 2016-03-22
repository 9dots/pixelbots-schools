/**
 * Imports
 */

import {input, capitalize, ellipsis, constants, mixins} from 'lib/styles'
import Dropdown from 'vdux-dropdown'
import * as colors from 'lib/colors'
import element from 'vdux/element'
import css from 'jss-simple'
import map from '@f/map'

/**
 * classNav
 */

function render ({props, children}) {
  const {classes = []} = props

  return (
    <Dropdown btn={<div>{children}</div>} class={nav}>
      <div class={filter}>
        <input type='search' placeholder='Filter classes…' class={input} />
      </div>
      {
        map(classItem, classes)
      }
    </Dropdown>
  )
}

function classItem (cls) {
  return (
    <span class={[capitalize, link]}>
      <span class={letter}>
        {cls.displayName[0]}
      </span>
      <span class={ellipsis}>
        {cls.displayName}
      </span>
    </span>
  )
}

/**
 * Style
 */

const {nav, filter, letter, link} = css({
  letter: {
    ...mixins.circle(25),
    margin: `0 ${constants.spacingSmall}`,
    background: colors.green,
    color: colors.white,
    lineHeight: '25px',
    textAlign: 'center',
    textTransform: 'uppercase',
    display: 'inline-block'
  },
  link: {
    color: colors.text_color,
    padding: `${constants.spacing} ${constants.spacingSmall}`
  },
  nav: {
    maxHeight: 350,
    backgroundColor: 'white',
    color: 'black',
    overflow: 'auto'
  },
  filter: {
    backgroundColor: 'transparent'
  }
})

/**
 * Exports
 */

export default {
  render
}
