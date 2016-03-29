/**
 * Imports
 */

import {red, yellow, green, blue} from 'lib/colors'
import {Block, Text} from 'vdux-ui'
import element from 'vdux/element'
import times from '@f/times'
import css from 'jss-simple'

/**
 * Loading
 */

function render ({props}) {
  return (
    <span class={loader} style={{textAlign: 'center'}}>
      <Block mt='m'>
        <Text lh='30px' weight='lighter'>Loading…</Text>
      </Block>
      <Block mt='m' pt='m'>
        {
          times(4, i => <div class={dot} style={dotStyle(i)}></div>)
        }
      </Block>
    </span>
  )
}

/**
 * Style
 */

const colors = [red, yellow, green, blue]

function dotStyle (i) {
  return {
    backgroundColor: colors[i],
    animationDelay: (0.1 * (i + 1)) + 's'
  }
}

const {dot, loader} = css({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    width: 200,
    height: 100
  },
  dot: {
    margin: '0px 3px',
    display: 'inline-block',
    height: 15,
    width: 15,
    borderRadius: '50%',
    animation: 'wave 2s infinite ease-in-out',
    transform: 'translateY(0)',
  },
  '@keyframes wave': {
    '0%, 60%, 100%': {
      opacity: 0.25,
      transform: 'translateY(0)'
    },
    '20%': {
      opacity: 0.75,
      transform: 'translateY(13px)'
    },
    '40%': {
      opacity: 0.75,
      transform: 'translateY(-13px)'
    }
  }
})

/**
 * Exports
 */

export default {
  render
}
