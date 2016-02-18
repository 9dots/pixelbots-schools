/**
 * Imports
 */

import resize from 'lib/resize-image'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Figure
 */

function render ({props}) {
  const {url, width, height, thumb} = props

  if (!url) return <span></span>

  const ratio = props.ratio || height / width
  const paddingBottom = ratio * 100 + '%'

  return (
    <div class={container}>
      <div style={{paddingBottom}}>
        <img class={img} src={thumb ? resize(url, 350) : url} />
      </div>
    </div>
  )
}

/**
 * Style
 */

const {container, img} = css({
  img: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 'auto',
    display: 'block'
  },
  container: {
    overflow: 'hidden',
    position: 'relative',
    maxWidth: '100%',
    margin: 0
  }
})

/**
 * Exports
 */

export default {
  render
}
