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
 * initialState
 */

function initialState ({props}) {
  const {object} = props

  return {
    answer: object.response
  }
}

/**
 * <ActivityQuestion/>
 */

function render ({props, local, state}) {
  const {activity, object, idx, answerable, showAnswers, currentUser} = props
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
              showAnswers={showAnswers}
              currentUser={currentUser}
              answerable={answerable}
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
  submitAnswer: answer => ({
    answering: {
      serialize: true,
      autoretry: true,
      url: `/instance/${activity._id}/question/${object._id}/response`,
      method: 'PUT',
      body: {
        answer
      }
    }
  })
}))({
  initialState,
  render,
  reducer
})
