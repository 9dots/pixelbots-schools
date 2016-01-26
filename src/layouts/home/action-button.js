/**
 * Imports
 */

import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Style
 */

const style = css({
  btn: {
    textAlign: 'right',
    lineHeight: '21px',
    cursor: 'pointer'
  },
  link: {
    display: 'block',
    padding: '4px 12px',
    color: '#fff',
    border: '2px solid white',
    opacity: '0.8',
    fontWeight: '400'
  }
})

/**
 * Render
 */

function render ({props}) {
  const {children, link} = props

  return (
    <div class={style.btn}>
      <a href={link} class={style.link}>
        {children}
      </a>
    </div>
  )
}


/**
 * Exports
 */

export default {render}
