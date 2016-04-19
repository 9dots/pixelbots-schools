/**
 * Imports
 */

const fs = require('fs')

/**
 * Read in global styles
 */

const globalStyle = fs.readFileSync(__dirname + '/global.css', 'utf8')

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
          <style>
            ${globalStyle}
          </style>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <script type='text/javascript' src='${process.env.CLIENT_JS_BUILD}'></script>
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
