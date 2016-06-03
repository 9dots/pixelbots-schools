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
  const {url, thumb} = props

  if (url) {
    yield loadImage(getUrl(url, thumb))
    yield local(loaded)()
  }
}

/**
 * Figure
 */

function render ({props, state}) {
  const {url, width, height, thumb} = props

  if (!url) return <span/>

  const ratio = props.ratio || height / width

  return (
    <Block m={0} relative overflow='hidden' maxWidth='100%' {...props}>
      <Block paddingBottom={ratio * 100 + '%'}>
        <Block hidden={!state.loaded} tag='img' tall wide absolute m='auto' src={getUrl(url, thumb)} />
      </Block>
    </Block>
  )
}

/**
 * onUpdate
 */

function * onUpdate (prev, {props, local}) {
  const {url, thumb} = props
  const oldUrl = getUrl(prev.props.url, prev.props.thumb)
  const newUrl = getUrl(url, thumb)

  if (newUrl && oldUrl !== newUrl) {
    yield local(unloaded)()
    yield loadImage(newUrl)
    yield local(loaded)()
  }
}

/**
 * Helpers
 */

function getUrl (url, thumb) {
  return thumb
    ? resize(url, thumb === true ? 350 : thumb)
    : url
}

/**
 * Actions
 */

const loaded = createAction('<Figure/>: image loaded', null, () => ({logLevel: 'debug'}))
const unloaded = createAction('<Figure/>: image unloaded', null, () => ({logLevel: 'debug'}))

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
  reducer,
  onUpdate
}
