/**
 * Imports
 */

import element from 'vdux/element'
import Icon from 'components/icon'
import css from 'jss-simple'

/**
 * Homepage content block
 */

function render () {
  return (
    <div>
      <h1 class={slogan}>Teach Better, Together.</h1>
      <h4 class={tagline}>Create and share educational activities with colleagues and students</h4>
      <Icon class={play} name='play_circle_fill' />
    </div>
  )
}

/**
 * Styles
 */

const {slogan, tagline, play} = css({
  slogan: {
    font: '600 65px/65px Lato,Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif'
  },
  tagline: {
    maxWidth: 600,
    lineHeight: '36px',
    fontSize: 28,
    margin: 'auto auto 12px'
  },
  play: {
    cursor: 'pointer',
    opacity: 0.85,
    fontSize: 90,
    '&:hover': {
      opacity: 1
    }
  }
})

/**
 * Exports
 */

export default render
