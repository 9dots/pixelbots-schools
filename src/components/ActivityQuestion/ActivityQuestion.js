/**
 * Imports
 */

import QuestionAttachment from 'components/QuestionAttachment'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {Block, Badge} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'
import map from '@f/map'

/**
 * <ActivityQuestion/>
 */

function render ({props, local, state}) {
  const {object, idx, answerable, showAnswers} = props
  const {displayName, poll, attachments = []} = object
  const isMultipleChoice = !poll && attachments[0] && attachments[0].objectType === 'choice'

  return (
    <Block fw='lighter'>
      <Block align='start' py mb>
        <Badge mr pt={3} size={25}>{idx + 1}</Badge>
        <Block fs='s' flex innerHTML={displayName} />
      </Block>
      <Block align='start' mx={30} column={isMultipleChoice}>
        {
          map(
            (object, i) => <QuestionAttachment
              answer={state.answer}
              submit={answer => [
                props.submitAnswer(answer),
                local(setAnswer)(answer)
              ]}
              object={object}
              poll={poll}
              idx={i} />,
            attachments
          )
        }
      </Block>
    </Block>
  )
}

/**
 * Actions
 */

const setAnswer = createAction('<ActivityQuestion/>: set answer')

/**
 * Reducer
 */

const reducer = handleActions({
  [setAnswer]: (state, answer) => ({
    ...state,
    answer
  })
})

/**
 * Exports
 */

export default summon(({activity, object}) => ({
  submitAnswer: value => ({
    answering: {
      url: `/instance/${activity._id}/${object._id}`,
      method: 'PUT',
      body: {
        value
      }
    }
  })
}))({
  render,
  reducer
})
