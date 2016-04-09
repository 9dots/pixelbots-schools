/**
 * Imports
 */

import resize from 'lib/resize-image'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * Figure
 */

function render ({props}) {
  const {url, width, height, thumb} = props

  if (!url) return <span></span>

  const ratio = props.ratio || height / width
  const paddingBottom = ratio * 100 + '%'

  return (
    <Block m={0} relative style={{overflow: 'hidden', maxWidth: '100%'}}>
      <Block style={{paddingBottom}}>
        <Block tag='img' tall wide absolute m='auto' src={thumb ? resize(url, 350) : url} />
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
