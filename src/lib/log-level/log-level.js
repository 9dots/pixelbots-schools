/**
 * Log levels
 */

const levels = [
  'trace',
  'debug',
  'info',
  'warn',
  'error'
]

let logLevel = 'info'

/**
 * shouldLog
 *
 * Logging predicate
 */

function shouldLog (level) {
  return getLevelIndex(level) >= getLevelIndex(logLevel)
}

/**
 * setLogLevel
 *
 * Set the log level
 */

function setLogLevel (level) {
  logLevel = level
}

/**
 * getLevelIndex
 *
 * Get the index for a given level string
 */

function getLevelIndex (level) {
  return levels.indexOf(level)
}

/**
 * Exports
 */

export {
  shouldLog,
  setLogLevel
}
