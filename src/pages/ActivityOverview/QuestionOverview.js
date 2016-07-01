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
  const {activity, students, instances} = props
  const questions = getQuestions(instances)

  return (
    <Block pb='l'>
      <Flex color='white' lighter fs='s' mt='l' mb pt>
        <Block bgColor='grey' boxShadow='card' flex p>Question</Block>
        <Block bgColor='grey' boxShadow='card' ml p w={138}>Average</Block>
      </Flex>
      {
        map((question, i) => <Question students={students} instances={instances} question={question} i={i} />, questions)
      }
    </Block>
  )
}

function Question ({props}) {
  const {question, i, instances} = props
  const {
    displayName, poll,
    points: {max}, total, numAnswered
  } = question
  const responseType = question.attachments[0].objectType
  const iconMap = {
    choice: poll ? 'equalizer' : 'done_all',
    shortAnswer: 'edit',
    text: 'message'
  }
  let average = Math.round((total / numAnswered) * 10) / 10

  return (
    <Flex fs='s' lighter wide>
      <Card p bg='white' ellipsis flex align='start center'>
        <Block>{i+1}.</Block>
        <Icon name={iconMap[responseType]} fs='s' mx/>
        <Block ellipsis flex>{displayName}</Block>
        <Icon name='keyboard_arrow_down'  ml='s' fs='s' />
      </Card>
      <Card p bg='white' ml minWidth={138} align='start center'>
        <Block circle='7' bg={getColor(average / max)} mr='16'/>
        {average} / {max}
      </Card>
    </Flex>
  )
}

/**
 * Helpers
 */

function getQuestions(instances) {
  const questions = []
  instances.forEach(instance => {
    const {status} = instance
    let count = 0
    if(status > 4) {
      instance._object[0].attachments.forEach((att, i) => {
        const {objectType, points} = att
        if(objectType === 'question') {
          if(!questions[count])
            questions[count] = { total: 0, numAnswered: 0, ...att }
          const total = points.scaled * points.max
          questions[count].total += (total || 0)
          questions[count].numAnswered++
          count++
        }

      })
    }

  })
  return questions
}

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