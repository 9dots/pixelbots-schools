/**
 * Imports
 */

import element from 'vdux/element'
import css from 'jss-simple'

/**
 * blockInput
 */

function render ({props}) {
  const {type = 'text'} = props

  return (
    <div class={container}>
      <input {...props} class={input} type={type} />
    </div>
  )
}

/**
 * Styles
 */

const {container, input} = css({
  container: {
    width: '100%',
    marginBottom: 6
  },
  input: {
    padding: '12px 14px',
    border: 0,
    color: '#666',
    fontSize: '13px',
    fontWeight: 500,
    outline: 0,
    width: '100%',
    background: '#ececec'
  }
})

/**
 * Exports
 */

export default {
  render
}
