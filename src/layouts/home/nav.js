/**
 * Imports
 */

import {row, flex, align} from 'lib/layout'
import {logo120} from 'lib/assets'
import element from 'vdux/element'
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

 const {outer, inner, anchor} = css({
  outer: {
    color: '#fff',
    display: 'flex',
    fontFamily: 'lato',
    padding: '2px 0'
  },
  anchor: {
    padding: '13px',
    display: 'inline-block',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: '400',
    lineHeight: '1em',
    color: '#fff',
    '-webkit-font-smoothing': 'antialiased',
    transition: 'color 0.1s 0s ease-in-out'
  }
})

/**
 * Render
 */

function render () {
  return (
    <div class={[outer, align.start_center, flex, row]}>
      <a class={[anchor, row, align.start_center]} href='/' style={{padding: 0, marginRight: 12}}>
        <img src={logo120} width='28' />
      </a>
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
