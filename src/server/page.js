/**
 * Imports
 */

import css from './css'

/**
 * Page
 */

function page ({html, state}) {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <base href='/' />
          <meta name='google' content='notranslate' />

          <title>Weo</title>
          ${
            css.map(str => `<style>${str}</style>`).join('')
          }
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <script type='text/javascript'>
            window.__initialState__ = ${JSON.stringify(state)}
          </script>
          <script type='text/javascript' src='${process.env.CLIENT_JS_BUILD}'></script>
        </head>
        <body>${html}</body>
      </html>
    `
}

/**
 * Exports
 */

export default page
