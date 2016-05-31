/**
 * Imports
 */

import {Base, ProgressBar, ErrorTip} from 'vdux-ui'
import handleActions from '@f/handle-actions'
import {uploadFile} from 'middleware/upload'
import createAction from '@f/create-action'
import DropZone from 'components/DropZone'
import element from 'vdux/element'
import noop from '@f/noop'

/**
 * initialState
 */

function initialState () {
  return {
    n: 0,
    uploading: false,
    progress: 0
  }
}

/**
 * <FileUpload/>
 */

function render ({props, state, local}) {
  const {onUpload = noop, validate = () => ({valid: true})} = props
  const {progress, uploading, error} = state

  return (
    <DropZone
      relative
      accepts='Files'
      dragonProps={{
        message: 'Drop File',
        color: 'blue'
      }}
      message='Drag File or Click Here'
      color='grey_medium'
      border='1px dashed'
      bgColor='grey_light'
      sq={300}
      fs='s'
      relative
      fw='lighter'
      mx='auto'
      uploading={uploading}>
      <ProgressBar w='50%' h='5' absolute top bottom right left m='auto' hide={!uploading} progress={progress} />
      <ErrorTip show={!!error} message={error} placement='right' />
      <Base
        tall wide
        onChange={upload}
        tag='input' type='file' opacity='0' absolute pointer />
    </DropZone>
  )

  function *upload (e) {
    const file = e._rawEvent.target.files[0]
    const {valid, message} = validate(file)

    if (! valid) {
      yield local(uploadError)(message)
      return
    }

    const n = state.n + 1
    yield local(uploadStart)(n)
    const url = yield uploadFile(file,
      progress => local(uploadProgress)({n, progress})
    )
    yield local(uploadEnd)(n)
    yield onUpload(url)
  }
}

/**
 * Actions
 */

const uploadStart = createAction('<FileUpload/>: upload start')
const uploadProgress = createAction('<FileUpload/>: upload progress')
const uploadError = createAction('<FileUpload/>: upload error')
const uploadEnd = createAction('<FileUpload/>: upload end')

/**
 * Reducer
 */

const reducer = handleActions({
  [uploadStart]: (state, n) => ({
    ...state,
    n,
    uploading: true,
    error: null
  }),
  [uploadProgress]: (state, {n, progress}) => state.n !== n
    ? state
    : {...state, progress},
  [uploadEnd]: (state, n) => state.n !== n
    ? state
    : {...state, uploading: false, progress: 0},
  [uploadError]: (state, error) => ({
    ...state,
    error
  })
})

/**
 * Exports
 */

export default {
  initialState,
  render,
  reducer
}