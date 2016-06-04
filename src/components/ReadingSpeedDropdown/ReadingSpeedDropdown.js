/**
 * Imports
 */

import {Block, Flex} from 'vdux-ui'
import {Dropdown, Button, MenuItem} from 'vdux-containers'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <ReadingSpeedDropdown/>
 */

function render ({props}) {
  const {user, setSpeed} = props
  const speed = user.preferences.speech_speed || 1

  return (
    <Block display='inline-block' fw='normal'>
      <Dropdown mb='l' wide btn={
          <Button
            focusProps={{highlight: .01}}
            hoverProps={{highlight: .01}}
            border='1px solid text'
            bgColor='white'
            color='text'
            px>
            Reading Speed:
            <Block fontFamily='monoSpace' ml='s'>
              {speed.toFixed(1) || '1.0'}
            </Block>
          </Button>
        }>
        {
          speeds.map(({displayName, val}) => <MenuItem
            onClick={() => setSpeed(val)}
            align='start space-between'
            fs='xs'
            py>
              <Block flex>
                {displayName}
              </Block>
              <Block fontFamily='monospace'>
                {val.toFixed(1)}
              </Block>
            </MenuItem>)
        }
      </Dropdown>
    </Block>
  )
}

const speeds = [
  {
    displayName: 'Slowest',
    val: 0.7
  },
  {
    displayName: 'Slower',
    val: 0.8
  },
  {
    displayName: 'Normal',
    val: 1.0
  },
  {
    displayName: 'Faster',
    val: 1.5
  },
  {
    displayName: 'Fastest',
    val: 2.0
  }
]

/**
 * Exports
 */

export default summon(({currentUser}) => ({
  setSpeed: (val) => ({
    savingPreference:  {
      url: '/preference/speech_speed',
      invalidates: '/user',
      method: 'PUT',
      body: {
        value: val
      }
    }
  })
}))({
  render
})
