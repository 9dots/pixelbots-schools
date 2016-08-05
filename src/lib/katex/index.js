const cloudFS = require('cloud-fs')

exports.fontsUrl = cloudFS.url('./static/fonts.css')
exports.url = cloudFS.url('./static/katex.css')
