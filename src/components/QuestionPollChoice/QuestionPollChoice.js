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
  Color(grey).lighten(0.3).rgbString()
].map(c => Color(c).lighten(0.3).rgbString())

/**
 * <QuestionPollChoice/>
 */

function render ({props}) {
  const {object, idx, answerable, submit, answer = []} = props
  const {displayName} = object
  const chosen = answer[0] === object._id
  const hasAnswer = !!answer.length
  const bgColor = hasAnswer
    ? chosen ? colors[idx % colors.length] : 'grey_light'
    : colors[idx % colors.length]

  return (
    <Block
      pointer={answerable}
      onClick={answerable && submitAnswer}
      boxShadow='card'
      rounded='4px'
      m
      tall
      flex='0 0 30%'
      maxWidth='140px'
      mx='1%'
      bgColor={bgColor}>
      <Block pb='100%' wide relative>
        <Block absolute wide tall top left align='center center'>
          <Block innerHTML={displayName} />
        </Block>
      </Block>
    </Block>
  )

  function * submitAnswer () {
    yield submit(chosen ? [] : [object._id])
  }
}

/**
 * Exports
 */

export default {
  render
}
