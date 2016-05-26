/**
 * Imports
 */

import mime from 'browserify-mime'
import _upload from '@f/s3-upload'
import {post} from 'lib/api/req'
import noop from '@f/noop'

/**
 * Actions
 */

const UPLOAD_FILE = 'Upload file'

function uploadFile (file, progress) {
  return {
    type: UPLOAD_FILE,
    payload: {
      file,
      progress
    }
  }
}

/**
 * Upload middleware
 */

function middleware ({dispatch}) {
  return next => action => {
    switch (action.type) {
      case UPLOAD_FILE:
        return dispatch(doUploadFile(action.payload, dispatch))
      default:
        return next(action)
    }
  }
}

/**
 * Upload file
 */

function * doUploadFile ({file, progress = noop}, dispatch) {
  try {
    const {type} = file
    const {value: S3} = yield post('/s3/upload')

    return yield upload({
      file,
      S3,
      type,
      attachment: !isImage(type),
      name: S3.name + ext(file)
    }, percent => dispatch(progress(percent)))
  } catch (err) {
    console.log('err', err)
  }
}

function upload (config, progress) {
  return new Promise((resolve, reject) => {
    _upload(config, progress, (err, url) => err ? reject(err) : resolve(url))
  })
}

/**
 * Helpers
 */

function ext (file) {
  const mimeExt = mime.extension(file.type)
  if (mimeExt) return '.' + mimeExt
  if (!file.name) return ''

  return file.name.lastIndexOf('.') > 0
    ? file.name.slice(idx - 1)
    : '._' + file.name
}

function isImage (type) {
  return /^image\//.test(type)
}

/**
 * Exports
 */

export default middleware
export {
  uploadFile
}
