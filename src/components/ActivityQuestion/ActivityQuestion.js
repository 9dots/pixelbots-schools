/**
 * Imports
 */

import QuestionAttachment from 'components/QuestionAttachment'
import QuestionComments from 'components/QuestionComments'
import {debounceAction, Button} from 'vdux-containers'
import EditableQuestion from './EditableQuestion'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {Block, Badge, Icon} from 'vdux-ui'
import element from 'vdux/element'
import getProp from '@f/get-prop'
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
  if (props.editing) return <EditableQuestion {...props} />

  const {
    activity, overview, object, idx, answerable, showAnswers,
    comments, showIncorrect, showComments, commentsId, currentUser, onEdit,
    ...rest
  } = props
  const {poll, attachments = [], points, id, content, randomize} = object

  const commentList = comments && comments
    .filter(comment => getId(getProp('_object.0.location.path', comment)) === getId(id))
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  const isStudent = currentUser && currentUser.userType === 'student'
  const type = getProp('0.objectType', attachments)

  return (
    <Block fw='lighter' relative class='question' {...rest}>
      {
        !poll && comments &&
        <QuestionComments
          hide={isStudent && commentList.length === 0}
          absolute={{right: 0, top: 0}}
          showComments={showComments}
          currentUser={currentUser}
          commentsId={commentsId}
          comments={commentList}
          activity={activity}
          question={object}
          z='2'/>
      }
      <IncorrectX show={!poll && showIncorrect && (!points.scaled || points.scaled <= .5)} />
      <Block align='start' py mb>
        {!overview && <Badge mr pt={3} size={25}>{idx + 1}</Badge>}
        <Block flex>
          <Block key='a' fs='s' innerHTML={content} class='markdown' />
        </Block>
      </Block>
      <Block align='start' mx={overview ? 40 : 30} column={!poll && type === 'choice'}>
        {
          map(
            (att, i) => <QuestionAttachment
              showAnswers={showAnswers}
              answerable={answerable}
              actor={activity && activity.actor}
              answer={state.answer}
              overview={overview}
              question={object}
              submit={answer => [
                state.debouncedSubmit(answer),
                local(setAnswer)(answer)
              ]}
              object={att}
              poll={poll}
              idx={i} />,
            attachments
          )
        }
      </Block>
    </Block>
  )
}

function IncorrectX ({props}) {
  return (
    <Block
      printProps={{bgColor: 'transparent', left: -25, boxShadow: '0 0 0', borderRadius: 0}}
      absolute={{left: -40, top: 8}}
      align='center center'
      bgColor='red'
      boxShadow='0 1px 3px 0 rgba(0,0,0,0.5)'
      color='white'
      hide={!props.show}
      circle={32}
      m='auto'>
        <Icon
          printProps={{fs: 'l', color: 'red'}}
          name='close'
          fs='s' />
    </Block>
  )
}

function onUpdate (prev, next) {
  if(!prev.props.activity) return
  if (prev.props.activity._id !== next.props.activity._id) {
    return next.local(setAnswer)(next.props.object.response)
  }
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
 * Helpers
 */

function getId (str) {
  if (typeof str !== 'string') return
  const arr = str.split('.')
  return arr[arr.length - 1]
}

function QuestionTypeMenu ({props}) {
  const {attach} = props
  const btnProps = {
    bgColor: 'grey',
    h: 45,
    px: 30
  }
  return (
    <Block align='space-around center' wide my>
      <Button {...btnProps} onClick={attach('choice', true)}>
        <Icon name='equalizer' fs='s' mr='s' />
        <Block>Poll</Block>
      </Button>
      <Button {...btnProps} onClick={attach('choice', false)}>
        <Icon name='done_all' fs='s' mr='s' />
        <Block>Multiple Choice</Block>
      </Button>
      <Button {...btnProps} onClick={attach('shortAnswer')}>
        <Icon name='edit' fs='s' mr='s' />
        <Block>Short Answer</Block>
      </Button>
      <Button {...btnProps} onClick={attach('text')}>
        <Icon name='message' fs='s' mr='s' />
        <Block>Free Response</Block>
      </Button>
    </Block>
  )
}

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
