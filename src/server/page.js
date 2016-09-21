/**
 * Imports
 */

import css from './css'
import path from 'path'
import favicon from 'lib/favicon'
import * as katex from 'lib/katex'

const cloudFS = require('cloud-fs')
const client = cloudFS.url('./scripts/weo.js')
const apiStatic = process.env.API_STATIC
const clientStatic = process.env.STATIC_FILES || ''

/**
 * Page
 */

function page ({html, state, title}) {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <base href='/' />
          <meta name='google' content='notranslate' />

          <title>${title || 'Weo'}</title>
          ${
            css.map(str => `<style>${str}</style>`).join('')
          }
          <link rel=icon href="${path.join(clientStatic, favicon)}"/>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="${path.join(clientStatic, katex.cssUrl)}" rel="stylesheet"/>
          <script type='text/javascript'>
            window.__initialState__ = ${JSON.stringify(state)}
          </script>
          <script type='text/javascript' src='${path.join(apiStatic, 'socket.io/socket.io.js')}'></script>
          <script type='text/javascript' src='${path.join(clientStatic, client)}'></script>
        </head>
        <body>${html}</body>
      </html>
    `
}

/**
 * Exports
 */

export default page
