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
import fs from 'fs'
import path from 'path'

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

const globalStyle = fs.readFileSync(path.join(__dirname, 'global.css'), 'utf8')

function page ({html, state}) {
  return   return `
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
          <script type='text/javascript' src='${process.env.JSON_ENTRY}'></script>
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
  return new Promise((resolve, reject) => {
    const {subscribe, render} = vdux({
      middleware: middleware(opts),
      initialState,
      reducer
    })

    const stop = subscribe(state => {
      try {
        const html = render(<App state={state} />)

        if (state.ready) {
          stop()
          resolve({html, state})
        }
      } catch (err) {
        reject(err)
        stop()
      }
    })
  })

}
