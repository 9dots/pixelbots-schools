/**
 * Render a page
 */

function page ({html, vtree, state}, urls) {
  return `
    <html>
      <head>
        <title>Weo</title>
        <style>
          body {
            margin: 0;
            padding: 0;
          }
        </style>
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
