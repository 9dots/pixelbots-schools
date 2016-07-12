/**
 * Imports
 */

import {grey, blue, yellow, green, red} from 'lib/colors'
import Avatar from 'components/Avatar'
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
  const {object, idx, answerable, submit, answer = [], currentUser} = props
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
      flexShrink='1'
      maxWidth='140px'
      mx='1%'
      bgColor={bgColor}>
      <Block pb='100%' wide relative>
        <Block absolute wide tall top left align='center center'>
          <Block innerHTML={displayName} />
        </Block>
        { chosen && <ChosenMarker actor={currentUser} /> }
      </Block>
    </Block>
  )

  function * submitAnswer () {
    yield submit(chosen ? [] : [object._id])
  }
}

function ChosenMarker ({props}) {
  const {actor} = props

  return (
    <Avatar
      absolute={{right: -6, top: -6}}
      border='2px solid white'
      boxShadow='z2'
      actor={actor}
      size='23%'
      boxSizing='content-box'
      m='auto'/>
  )
}

/**
 * Exports
 */

export default {
  render
}
