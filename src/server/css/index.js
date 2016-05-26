/**
 * Imports
 */

const fs = require('fs')

/**
 * Css
 */

const globalCss = fs.readFileSync(__dirname + '/global.css', 'utf8')
const cropperCss = fs.readFileSync(__dirname + '/cropper.css', 'utf8')

/**
 * Exports
 */

export default [
  globalCss,
  cropperCss
]
