/**
 * Imports
 */

import {Flex, Block, Card, Icon} from 'vdux-ui'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import QuestionRow from './QuestionRow'
import element from 'vdux/element'
import map from '@f/map'

/**
 * Render
 */

function render({props, local, state}) {
  const questions = getQuestions(props)

  return (
    <Block pb='l'>
      <Flex color='white' lighter fs='s' mt='l' mb pt>
        <Block bgColor='grey' boxShadow='card' flex p>Question</Block>
        <Block bgColor='grey' boxShadow='card' ml p w={138}>Average</Block>
      </Flex>
      {
        map((question, i) =>
          <QuestionRow
            expanded={state.expandedAtt === i}
            dismiss={local(toggle, null)}
            toggle={local(toggle, i)}
            question={question}
            i={i}/>, questions)
      }
    </Block>
  )
}

/**
 * Helpers
 */

function getQuestions({activity, instances}) {
  const questions = []
  activity._object[0].attachments.forEach((attachment, i) => {
    if(attachment.objectType === 'question') {
      const length = questions.push({total: 0, numAnswered: 0, ...attachment})
      instances.forEach(instance => {
        if(instance.status > 4) {
          const question = instance._object[0].attachments[i]
          const total = question.points.scaled * question.points.max
          questions[length - 1].total += (total || 0)
          questions[length - 1].numAnswered++
        }
      })
    }
  })
  return questions
}


/**
 * Actions
 */

const toggle = createAction('<QuestionOverview/>: toggle')


/**
 * Reducer
 */

const reducer = handleActions({
  [toggle]: (state, i) => ({
    ...state,
    expandedAtt: state.expandedAtt === i ? null : i
  })
})

/**
 * Exports
 */

export default {
  render,
  reducer
}