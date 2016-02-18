/**
 * Imports
 */

import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Generic OAuth Button
 */

function render ({props, children}) {
  return (
    <button {...props} class={[oauth, props.class]}>
      {children}
    </button>
  )
}

/**
 * Styles
 */

const {oauth} = css({
  oauth: {
    padding: '0 25px',
    marginBottom: 0,
    fontSize: '13px',
    lineHeight: '2.1em',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    borderRadius: '3px',
    whiteSpace: 'nowrap',
    outline: 0,
    border: 0,
    lineHeight: '41px !important',
    position: 'relative',
    fontSize: '12px !important',
    float: 'left',
    width: 'calc(50% - 6px) !important',
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 33,
      height: '100%',
      borderLeft: '1px solid rgba(52,52,52,0.08)'
    }
  }
})

/**
 * Exports
 */

export default {
  render
}
