/**
 * Imports
 */

import layout, {align} from 'lib/layout'
import {logo120} from 'lib/assets'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Menu
 */

const links = {
  About: 'http://about.weo.io',
  Blog: 'http://about.weo.io/blog/',
  Community: 'http://community.weo.io'
}

/**
 * Style
 */

const wrapper = css({
  outer: {
    layoutAlign: 'start center',
    color: '#fff',
    flex: 1
  },
  inner: {
    display: 'inline-block',
    marginLeft: '12px'
  }
})

const item = css({
  outer: {
    padding: '13px',
    display: 'inline-block',
    color: '#fff'
  },
  inner: {
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: '400',
    lineHeight: '16px',
    color: '#fff',
    transition: 'color 0.1s 0s ease-in-out'
  }
})

/**
 * Render
 */

function render () {
  return (
    <div class={[wrapper.outer, align.start_center, layout.flex]}>
      <img src={logo120} width='26' />
      <div class={wrapper.inner}>
        {
          Object
            .keys(links)
            .map((text) => (
              <span class={item.outer}>
                <span class={item.inner}>
                  <a href={links[text]}>{text}</a>
                </span>
              </span>
            ))
        }
      </div>
    </div>
  )
}

/**
 * Exports
 */

export default {render}
