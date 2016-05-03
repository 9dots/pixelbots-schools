/**
 * Imports
 */

import resize from 'lib/resize-image'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <BgImg/>
 */

function render ({props}) {
  const {thumb, img, ...rest} = props
  const url = img.url ? img.url : img
  const resizedUrl = thumb
    ? resize(url, thumb === true ? 300 : thumb)
    : url

  return (
    <Block
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundImage={`url(${resizedUrl})`} {...rest} />
  )
}

/**
 * Exports
 */

export default {
  render
}
