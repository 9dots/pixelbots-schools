'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Log levels
 */

var levels = ['trace', 'debug', 'info', 'warn', 'error'];

var logLevel = 'info';

/**
 * shouldLog
 *
 * Logging predicate
 */

function shouldLog(level) {
  return getLevelIndex(level) >= getLevelIndex(logLevel);
}

/**
 * logLevel
 *
 * Set the log level
 */

function logLevel(level) {
  exports.logLevel = logLevel = level;
}

/**
 * getLevelIndex
 *
 * Get the index for a given level string
 */

function getLevelIndex(level) {
  return levels.indexOf(level);
}

/**
 * Exports
 */

exports.shouldLog = shouldLog;
exports.logLevel = logLevel;