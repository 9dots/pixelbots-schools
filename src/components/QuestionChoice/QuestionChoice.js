/**
 * Imports
 */

import {grey, blue, yellow, green, red} from 'lib/colors'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'
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
 * <QuestionChoice/>
 */

function render ({props}) {
  const {object, showAnswers, idx} = props
  const {content} = object
  const isCorrect = object.correctAnswer[0] === object._id

  return (
    <Block relative pill w='70%' p my='s' bgColor={colors[idx % colors.length]} align='start center'>
      <CorrectCheck show={showAnswers && isCorrect} />
      <Block mx='20px' fs='s' innerHTML={content} />
    </Block>
  )
}


function CorrectCheck ({props}) {
  const {show} = props

  return (
    <Block absolute={{left: -15, top: 7}} boxShadow='0 1px 3px 0 rgba(0,0,0,0.5)' circle='29' align='center center' hide={!show} bgColor='white' color='green'>
      <Icon fs='s' name='check' />
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
