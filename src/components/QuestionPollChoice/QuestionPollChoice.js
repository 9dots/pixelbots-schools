/**
 * Imports
 */

import {grey, blue, yellow, green, red} from 'lib/colors'
import element from 'vdux/element'
import {Block} from 'vdux-ui'
import Color from 'Color'

/**
 * Colors
 */

const colors = [
  blue,
  yellow,
  green,
  red,
  Color(grey).lighten(0.6).rgbString()
].map(c => Color(c).lighten(0.3).rgbString())

/**
 * <QuestionPollChoice/>
 */

function render ({props}) {
  const {object, idx} = props
  const {displayName} = object

  return (
    <Block boxShadow='card' rounded='4px' m tall flex='0 0 30%' maxWidth='140px' mx='1%' bgColor={colors[idx % colors.length]} flexShrink='1'>
      <Block pb='100%' wide relative>
        <Block absolute wide tall top left align='center center'>
          <Block innerHTML={displayName} />
        </Block>
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
