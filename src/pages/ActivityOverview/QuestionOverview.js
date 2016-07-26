/**
 * Imports
 */

import {getOverviewQuestions} from 'lib/activity-helpers'
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
  const {activity, instances} = props
  const questions = getOverviewQuestions(activity._object[0].attachments, instances)

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