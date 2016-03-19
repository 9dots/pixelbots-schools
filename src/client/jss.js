/**
 * Imports
 */

import vendorPrefixer from 'jss-vendor-prefixer'
import defaultUnits from 'jss-default-unit'
import camelCase from 'jss-camel-case'
import * as jss from 'jss-simple'
import nested from 'jss-nested'

/**
 * Setup jss
 */

jss
  .use(camelCase())
  .use(nested())
  .use(vendorPrefixer())
  .use(defaultUnits())

/**
 * Exports
 */

export default jss
