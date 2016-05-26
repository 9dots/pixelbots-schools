/**
 * Imports
 */

const fs = require('fs')

/**
 * Css
 */

const cropperCss = fs.readFileSync(__dirname + '/cropper.css', 'utf8')
const globalCss = fs.readFileSync(__dirname + '/global.css', 'utf8')

/**
 * Exports
 */

export default [
  cropperCss,
  globalCss
]
