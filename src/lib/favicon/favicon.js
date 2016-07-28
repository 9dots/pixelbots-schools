const cloudFS = require('cloud-fs')
const FAVICON = process.env.NODE_ENV === 'production'
  ? cloudFS.url('./favicon.ico')
  : cloudFS.url('./favicon-dev.ico')

export default FAVICON
