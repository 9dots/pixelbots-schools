const FAVICON = process.env.NODE_ENV === 'production'
  ? require('./favicon.ico')
  : require('./favicon-dev.ico')

export default FAVICON
