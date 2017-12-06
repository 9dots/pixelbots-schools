/**
 * Imports
 */

import Schema from '@weo-edu/schema'

/**
 * User schema
 */
const email = Schema('string')
  .format('email', 'Invalid email address')
/**
 * Exports
 */

export default email
