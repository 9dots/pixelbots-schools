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
  const {activity, students, instances} = props
  const questions = getQuestions(instances)

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