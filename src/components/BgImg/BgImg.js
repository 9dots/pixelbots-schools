/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import loadImage from '@f/load-image'
import resize from 'lib/resize-image'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * onCreate
 */

function * onCreate ({props, local}) {
  const {img, thumb} = props
  const url = getUrl(img, thumb)

  if (url) {
    yield loadImage(url)
    yield local(loaded)()
  }
}

/**
 * <BgImg/>
 */

function render ({props, state}) {
  const {img, thumb, ...rest} = props
  const resizedUrl = getUrl(img, thumb)

  return (
    <Block
      hidden={!state.loaded}
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundImage={`url(${resizedUrl})`} {...rest} />
  )
}

/**
 * onUpdate
 */

function * onUpdate (prev, next) {
  const pprops = prev.props
  const nprops = next.props

  const purl = getUrl(pprops.img, pprops.thumb)
  const nurl = getUrl(nprops.img, nprops.thumb)

  if (nurl && purl !== nurl) {
    yield next.local(unloaded)()
    yield loadImage(nurl)
    yield next.local(loaded)()
  }
}

/**
 * Helpers
 */

function getUrl (img, thumb) {
  const url = img.url ? img.url : img

  return thumb
    ? resize(url, thumb === true ? 300 : thumb)
    : url
}

/**
 * Actions
 */

const loaded = createAction('<BgImg/>: image loaded', null, () => ({logLevel: 'debug'}))
const unloaded = createAction('<BgImg/>: image unloaded', null, () => ({logLevel: 'debug'}))

/**
 * Reducer
 */

const reducer = handleActions({
  [unloaded]: state => ({
    ...state,
    loaded: false
  }),
  [loaded]: state => ({
    ...state,
    loaded: true
  })
})

/**
 * Exports
 */

export default {
  onCreate,
  render,
  onUpdate,
  reducer
}
