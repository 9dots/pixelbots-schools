/**
 * Imports
 */

import {imageLoaded} from 'vdux-containers'
import resize from 'lib/resize-image'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * Figure
 */

function render ({props}) {
  const {url, width, height, isLoaded, thumb, ...rest} = props
  if (!url) return <span/>

  const ratio = props.ratio || height / width

  return (
    <Block m={0} relative overflow='hidden' maxWidth='100%' {...rest}>
      <Block paddingBottom={ratio * 100 + '%'}>
        <Block hidden={!isLoaded} tag='img' tall wide absolute m='auto' src={getUrl(url, thumb)} />
      </Block>
    </Block>
  )
}

/**
 * Helpers
 */

function getUrl (url, thumb) {
  if (!url) return

  return thumb
    ? resize(url, thumb === true ? 350 : thumb)
    : url
}

/**
 * Exports
 */

export default imageLoaded(({url, thumb}) => url && getUrl(url, thumb))({
  render
})
