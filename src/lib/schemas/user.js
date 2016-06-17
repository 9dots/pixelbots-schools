/**
 * Imports
 */

import Schema from '@weo-edu/schema'

/**
 * User schema
 */

const username = Schema('string')
  .min(3, 'Username must be at least 3 characters long')

const password = Schema('string')
  .min(6, 'Password must be at least 6 characters long')

const email = Schema('string')
  .format('email', 'Invalid email address')

const givenName = Schema('string')
  .min(1, 'Required')

const familyName = Schema('string')
  .min(1, 'Required')

const name = Schema()
  .prop('givenName', givenName)
  .prop('familyName', familyName)
  .prop('honorificPrefix', 'string')
  .required(['givenName', 'familyName'])

const user = Schema()
  .prop('username', username)
  .prop('password', password)
  .prop('name', name)
  .prop('email', email)
  .required(['password', 'name'])

/**
 * Exports
 */

export default user
export {
  username,
  password,
  email,
  name
}
