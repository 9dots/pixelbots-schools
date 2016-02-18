/**
 * Imports
 */

import Schema from '@weo-edu/schema'
import user from './user'

/**
 * Teacher schema
 */

const teacher = user
  .required('email')

/**
 * Exports
 */

export default teacher