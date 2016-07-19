/**
 * Imports
 */

import QuestionAttachment from 'components/QuestionAttachment'
import QuestionComments from 'components/QuestionComments'
import {debounceAction} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {Block, Badge, Icon} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'
import map from '@f/map'

/**
 * initialState
 */

function initialState ({props}) {
  const {object, submitAnswer} = props

  return {
    answer: object.response,
    debouncedSubmit: debounceAction(submitAnswer, 500)
  }
}

/**
 * <ActivityQuestion/>
 */

function render ({props, local, state}) {
  const {
    activity, object, idx, answerable, showAnswers, comments,
    showIncorrect, showComments, commentsId, currentUser,
  } = props
  const {displayName, poll, attachments = [], points} = object
  const isMultipleChoice = !poll && attachments[0] && attachments[0].objectType === 'choice'

  const id = object.id.split('.')[1]

  const commentList = comments.filter(comment => (
    getId(comment._object[0].location.path) === getId(object.id)
  ))

  return (
    <Block fw='lighter' relative>
      <QuestionComments
        absolute={{right: 0, top: 0}}
        showComments={showComments}
        currentUser={currentUser}
        commentsId={commentsId}
        comments={commentList}
        activity={activity}
        question={object}
        z='2'/>
      <IncorrectX show={!poll && showIncorrect && (!points.scaled || points.scaled <= .5)} />
      <Block align='start' py mb>
        <Badge mr pt={3} size={25}>{idx + 1}</Badge>
        <Block fs='s' flex innerHTML={displayName} />
      </Block>
      <Block align='start' mx={30} column={isMultipleChoice}>
        {
          map(
            (object, i) => <QuestionAttachment
              showAnswers={showAnswers}
              answerable={answerable}
              actor={activity.actor}
              answer={state.answer}
              submit={answer => [
                state.debouncedSubmit(answer),
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

function IncorrectX({props}) {
  return (
    <Block
      absolute={{left: -40, top: 8}}
      align='center center'
      bgColor='red'
      boxShadow='0 1px 3px 0 rgba(0,0,0,0.5)'
      color='white'
      hide={!props.show}
      circle={32}
      m='auto'>
        <Icon fs='s' name='close' />
    </Block>
  )
}

function onUpdate (prev, next) {
  if (prev.props.activity._id !== next.props.activity._id) {
    return next.local(setAnswer)(next.props.object.response)
  }
}

/**
 * Helpers
 */

function getId(str) {
  const arr = str.split('.')
  return arr[arr.length - 1]
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
      invalidates: `/share/${activity.root.id}/instance/${activity.actor.id}`,
      method: 'PUT',
      body: {
        answer
      }
    }
  })
}))({
  initialState,
  render,
  reducer,
  onUpdate
})
