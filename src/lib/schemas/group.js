/**
 * Imports
 */

import Schema from '@weo-edu/schema'

/**
 * Group schema
 */

const displayName = Schema('string')
  .max(20, 'Class names must be shorter than 20 characters long')

const group = Schema()
  .prop('displayName', displayName)
  .required(['displayName'])

/**
 * Exports
 */

export default group
