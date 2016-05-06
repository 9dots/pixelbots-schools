/**
 * Imports
 */

import css from 'jss-simple'
import eot from './Lato-Light.eot'
import svg from './Lato-Light.svg'
import ttf from './Lato-Light.ttf'
import woff from './Lato-Light.woff'
import woff2 from './Lato-Light.woff2'

/**
 * Fonts
 */

css({
  '@font-face': {
    fontFamily: "'Lato'",
    fontWeight: '300',
    fontStyle: 'normal',
    src: [
      `url('${eot}')`,
      `url('${eot}?#iefix') format('embedded-opentype')`,
      `url('${woff2}') format('woff2')`,
      `url('${woff}') format('woff')`,
      `url('${ttf}') format('truetype')`,
      `url('${svg}#Lato-Light') format('svg')`,
    ].join(',')
  }
}, {named: false})

css({
  '@font-face': {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 400,
    src: "local('Lato Regular'), local('Lato-Regular'), url(//themes.googleusercontent.com/static/fonts/lato/v7/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff')"
  },
}, {named: false})

css({
  '@font-face': {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 700,
    src: "local('Lato Bold'), local('Lato-Bold'), url(//themes.googleusercontent.com/static/fonts/lato/v7/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff')"
  }
}, {named: false})

css({
  '@font-face': {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 900,
    src: "local('Lato Black'), local('Lato-Black'), url(//themes.googleusercontent.com/static/fonts/lato/v7/G2uphNnNqGFMHLRsO_72ngLUuEpTyoUstqEm5AMlJo4.woff) format('woff')"
  }
}, {named: false})