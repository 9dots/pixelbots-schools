/**
 * Imports
 */

import Schema from '@weo-edu/schema'

/**
 * Group schema
 */

const displayName = Schema('string')
  .max(20, 'Class names must be shorter than 20 characters long')
  .min(3, 'Class names must be at least 3 characters long')

const group = Schema()
  .prop('displayName', displayName)
  .prop('grade', 'string')
  .prop('school', 'string')
  .required(['displayName'])

/**
 * Exports
 */

export default group
