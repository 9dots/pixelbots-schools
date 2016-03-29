/**
 * Imports
 */

import 'babel-runtime/regenerator/runtime'
import style from './global.css'
import middleware from './middleware'
import element from 'vdux/element'
import App from 'components/app'
import vdux from 'vdux/string'
import reducer from 'reducer/'

/**
 * Render
 */

module.exports = handler

/**
 * Handle requests
 */

function handler (event) {
  return render(event).then(page)
}

/**
 * Page
 */

function page ({html, state}) {
  return `
    <html>
      <head>
        <base href='/' />
        <meta name='google' content='notranslate' />
        <title>Weo</title>
        <style>
          ${style}
        </style>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <script type='text/javascript' src='${process.env.JS_ENTRY}'></script>
        <script type='text/javascript'>
          window.__initialState__ = ${JSON.stringify(state)}
        </script>
      </head>
      <body>${html}</body>
    </html>
  `
}

/**
 * InitialState
 */

const initialState = {
  auth: {},
  user: {}
}

/**
 * Render to html string
 */

function render (opts) {
  return vdux({
    middleware: middleware(opts),
    initialState,
    reducer,
    app: state => <App state={state} />,
    ready: state => state.ready
  })
}
