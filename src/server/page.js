/**
 * Imports
 */

import fs from 'fs'
import path from 'path'

/**
 * Constants
 */

const globalStyle = fs.readFileSync(path.join(__dirname, 'global.css'))

/**
 * Render a page
 */

function page ({html, state}, urls) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <base href='/' />
        <meta name='google' content='notranslate' />

        <title>Weo</title>
        <style>
          ${globalStyle}
        </style>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <script type='text/javascript' src='${urls.js}'></script>
        <script type='text/javascript'>
          window.__initialState__ = ${JSON.stringify(state)}
        </script>
      </head>
      <body>${html}</body>
    </html>
  `
}

/**
 * Exports
 */

export default page
