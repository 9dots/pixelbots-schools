/**
 * Imports
 */

import {grey, blue, yellow, green, red} from 'lib/colors'
import Avatar from 'components/Avatar'
import {Block, Icon, Checkbox} from 'vdux-ui'
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
  Color(grey).lighten(0.6).rgbString()
].map(c => Color(c).lighten(0.3).rgbString())

/**
 * <QuestionChoice/>
 */

function render ({props}) {
  const {object, showAnswers, answerable, submit, idx, answer = [], actor} = props
  const {content} = object
  const isCorrect = object.correctAnswer[0] === object._id

  const chosen = isChosen(object, answer)
  const hasAnswer = !!answer.length
  const bgColor = hasAnswer
    ? chosen ? colors[idx % colors.length] : 'grey_light'
    : colors[idx % colors.length]

  return (
    <Block
      printProps={{bgColor: 'transparent', p: '2px 0 2px 20px'}}
      onClick={answerable && submitAnswer}
      p='12px 12px 12px 30px'
      pointer={answerable}
      align='start center'
      borderRadius='25px'
      bgColor={bgColor}
      relative
      w='70%'
      my='s'>
      <CorrectCheck show={showAnswers && isCorrect} />
      {chosen && <ChosenMarker actor={actor} />}
      <Block hide printProps={{hide: false, mr: true}}>
        <Checkbox checked={chosen} />
      </Block>
      <Block mx='40px' fs='s' innerHTML={content} class='markdown' printProps={{ml: 0}} />
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
  const {actor} = props

  return (
    <Avatar
      absolute={{left: 8, top: 0, bottom: 0}}
      border='2px solid white'
      boxShadow='0 1px 3px 0 rgba(0,0,0,0.5)'
      actor={actor}
      printProps={{hide: true}}
      size={32}
      m='auto'/>
  )
}

function CorrectCheck ({props}) {
  const {show} = props

  return (
    <Block
      absolute={{left: -18, top: 0, bottom: 0}}
      align='center center'
      bgColor='white'
      boxShadow='0 1px 3px 0 rgba(0,0,0,0.5)'
      color='green'
      hide={!show}
      circle={32}
      printProps={{boxShadow: '0 0 0', borderRadius: 0}}
      m='auto'>
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
