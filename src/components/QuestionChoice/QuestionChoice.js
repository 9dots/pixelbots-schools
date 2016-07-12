/**
 * Imports
 */

import {grey, blue, yellow, green, red} from 'lib/colors'
import Avatar from 'components/Avatar'
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
  const {object, showAnswers, answerable, submit, idx, answer = [], currentUser} = props
  const {content} = object
  const isCorrect = object.correctAnswer[0] === object._id

  const chosen = isChosen(object, answer)

  return (
    <Block
      pointer={answerable}
      onClick={answerable && submitAnswer}
      relative
      borderRadius='25px'
      w='70%'
      p
      my='s'
      bgColor={colors[idx % colors.length]}
      align='start center'>
      <CorrectCheck show={showAnswers && isCorrect} />
      {chosen && <ChosenMarker actor={currentUser} />}
      <Block mx='20px' fs='s' innerHTML={content} class='markdown' />
    </Block>
  )

  function * submitAnswer () {
    if (answer.indexOf(object._id) !== -1) {
      yield submit(answer.filter(id => id !== object._id))
    } else {
      yield submit(answer.concat(object._id))
    }
  }
}

function isChosen (obj, answer) {
  answer = [].concat(answer)
  return answer.indexOf(obj._id) !== -1
}

function ChosenMarker ({props}) {
  const {actor, show} = props

  return (
    <Avatar
      hide={!show}
      actor={actor}
      size={29}
      border='1px solid white'
      absolute={{left: -25, top: 7}}
      boxShadow='0 1px 3px 0 rgba(0,0,0,0.5)' />
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
