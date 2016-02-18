/**
 * Imports
 */

import {relative} from 'lib/styles'
import element from 'vdux/element'
import css from 'jss-simple'
import map from '@f/map'

/**
 * Menu
 */

function render ({props, children}) {
  const {containerStyle, itemStyle} = props

  return (
    <div class={[relative, 'menu']}>
      <ul class={'menu ' + (props.class || container)} style={{display: open ? 'block' : 'none', ...containerStyle}}>
        {
          map(item => <li class={[li, props.itemClass]}>{item}</li>, children)
        }
      </ul>
    </div>
  )
}

/**
 * Styles
 */

const {li, container} = css({
  container: {
    backgroundColor: '#fff',
    color: '#000',
    position: 'absolute',
    right: 0,
    top: '100%',
    listStyle: 'none',
    margin: '5px -3px 0 -3px',
    padding: 0,
    zIndex: 1
  },
  li: {
    '&:hover': {
      backgroundColor: '#f9f9f9'
    }
  }
})

/**
 * Exports
 */

export default {
  render
}
