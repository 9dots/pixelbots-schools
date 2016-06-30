/**
 * Imports
 */

import {Flex, Block, Card, Icon} from 'vdux-ui'
import element from 'vdux/element'
import map from '@f/map'

/**
 * Render
 */

function render({props}) {
  const {activity, students} = props
  const questions = activity._object[0].attachments.filter(attachment => {
    return attachment.objectType === 'question'
  })

  return (
    <Block pb='l'>
      <Flex color='white' lighter fs='s' mt='l' mb pt>
        <Block bgColor='grey' boxShadow='card' flex p>Question</Block>
        <Block bgColor='grey' boxShadow='card' ml p w={138}>Average</Block>
      </Flex>
      {
        map((question, i) => <Question question={question} i={i} />, questions)
      }
    </Block>
  )
}

function Question ({props}) {
  const {question, i} = props
  const {displayName, responseType, poll, points: {max}} = question
  const iconMap = {
    choice: poll ? 'equalizer' : 'done_all',
    shortAnswer: 'edit',
    text: 'message'
  }
  let average = 0.9

  return (
    <Flex fs='s' lighter wide>
      <Card p bg='white' ellipsis flex align='start center'>
        <Block>{i+1}.</Block>
        <Icon name={iconMap[responseType]} fs='s' mx/>
        <Block ellipsis flex>{displayName}</Block>
        <Icon name='keyboard_arrow_down'  ml='s' fs='s' />
      </Card>
      <Card p bg='white' ml minWidth={138} align='start center'>
        <Block circle='7' bg={getColor(average)} mr='16'/>
        0 / {max}
      </Card>
    </Flex>
  )
}

/**
 * Helpers
 */

function getColor (average) {
  let color = 'green'
  if(average < .6)
    color = 'red'
  else if(average < .8)
    color = 'yellow'

  return color
}

/**
 * Exports
 */

export default {
  render
}