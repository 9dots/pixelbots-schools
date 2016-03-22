/**
 * Imports
 */

import {row, flex, align} from 'lib/layout'
import HomeOwl from 'components/HomeOwl'
import {logo120} from 'lib/assets'
import element from 'vdux/element'
import {anchor} from 'lib/styles'
import css from 'jss-simple'

/**
 * Menu
 */

const links = {
  About: 'http://about.weo.io',
  Training: 'http://about.weo.io/training/',
  Blog: 'http://about.weo.io/blog/',
  Help: 'http://about.weo.io/help/'
}

/**
 * Style
 */

 const {outer, inner} = css({
  outer: {
    color: '#fff',
    display: 'flex',
    fontFamily: 'lato',
    padding: '2px 0'
  }
})

/**
 * Render
 */

function render () {
  return (
    <div class={[outer, align.start_center, flex, row]}>
      <HomeOwl />
      {
        Object
          .keys(links)
          .map((text) => <a class={anchor} href={links[text]}>{text}</a>)
      }
    </div>
  )
}

/**
 * Exports
 */

export default {render}
