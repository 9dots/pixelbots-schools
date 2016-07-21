/**
 * Imports
 */

import PollChoiceOverview from './PollChoiceOverview'
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
  const {object, idx, answerable, submit, answer = [], actor, overview} = props
  const chosen = answer[0] === object._id
  const hasAnswer = !!answer.length
  const bgColor = hasAnswer
    ? chosen ? colors[idx % colors.length] : 'grey_light'
    : colors[idx % colors.length]

  if(overview) return <PollChoiceOverview bgColor={bgColor} {...props} />

  return (
    <Block
      pointer={answerable}
      onClick={answerable && submitAnswer}
      bgColor={bgColor}
      boxShadow='card'
      maxWidth='140px'
      flex='0 0 30%'
      flexShrink='1'
      rounded='4px'
      mx='1%'
      tall>
      <Block pb='100%' wide relative>
        <Block absolute wide tall top left align='center center'>
          <Block innerHTML={object.content} class='markdown' fs='s' textAlign='center'/>
        </Block>
        { chosen && <ChosenMarker actor={actor} /> }
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
      boxSizing='content-box'
      boxShadow='z2'
      actor={actor}
      size='23%'
      m='auto'/>
  )
}

/**
 * Exports
 */

export default {
  render
}
