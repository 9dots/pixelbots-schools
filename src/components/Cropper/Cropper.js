/**
 * Imports
 */

import {Block, Base} from 'vdux-ui'
import element from 'vdux/element'
import debounce from '@f/debounce'
import Cropper from 'cropperjs'
import noop from '@f/noop'

/**
 * onCreate
 */

function onCreate ({path, props}) {
  const {onCrop = noop} = props

  return dispatch => {
    let data
    const handle = debounce(() => dispatch(onCrop(data)), 100)

    setTimeout(() => {
      const el = document.getElementById(path)
      new Cropper(el, {
        aspectRatio: 1,
        crop: newData => {
          data = newData
          handle()
        }
      })
    })
  }
}

/**
 * <Cropper/>
 */

function render ({path, props}) {
  const {url} = props

  return (
    <Block>
      <Base tag='img' id={path} src={url} maxWidth='100%' crossorigin='anonymous' />
    </Block>
  )
}

function onRemove ({path}) {
  return () => {
    const node = document.getElementById(path)
    node.cropper.destroy()
  }
}

/**
 * shouldUpdate
 */

function shouldUpdate () {
  return false
}

/**
 * Exports
 */

export default {
  onCreate,
  render,
  shouldUpdate,
  onRemove
}
