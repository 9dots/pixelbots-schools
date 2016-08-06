/**
 * Imports
 */

import css from './css'
import favicon from 'lib/favicon'
import * as katex from 'lib/katex'

const cloudFS = require('cloud-fs')

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
          <link rel=icon href="${favicon}"/>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="${katex.cssUrl}" rel="stylesheet"/>
          <script type='text/javascript'>
            window.__initialState__ = ${JSON.stringify(state)}
          </script>
          <script type='text/javascript' src='${cloudFS.url('./scripts/weo.js')}'></script>
        </head>
        <body>${html}</body>
      </html>
    `
}

/**
 * Exports
 */

export default page
