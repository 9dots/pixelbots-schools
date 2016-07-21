/**
 * Imports
 */

import QuestionAttachment from 'components/QuestionAttachment'
import QuestionComments from 'components/QuestionComments'
import {debounceAction, Button} from 'vdux-containers'
import {generateObjectId} from 'middleware/objectId'
import LineTextarea from 'components/LineTextarea'
import {Block, Badge, Icon, Toggle} from 'vdux-ui'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
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
  const {
    activity, editing, object, idx, answerable, showAnswers, comments,
    showIncorrect, showComments, commentsId, currentUser, onEdit
  } = props
  const {
    displayName, poll, attachments = [], points, id,
    content, originalContent, randomize
  } = object

  const commentList = comments && comments
    .filter(comment => getId(getProp('_object.0.location.path', comment)) === getId(id))
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  const isStudent = currentUser && currentUser.userType === 'student'
  const type = getProp('0.objectType', attachments)

  return (
    <Block fw='lighter' relative class='question'>
      {
        comments &&
        <QuestionComments
          hide={isStudent && commentList.length === 0}
          absolute={{right: 0, top: 0}}
          showComments={showComments}
          commentsId={commentsId}
          comments={commentList}
          activity={activity}
          question={object}
          z='2'/>
      }
      <IncorrectX show={!poll && showIncorrect && (!points.scaled || points.scaled <= .5)} />
      <Block align='start' py mb>
        <Badge mr pt={3} size={25}>{idx + 1}</Badge>
        {
          editing
            ? <LineTextarea onInput={e => onEdit({...object, originalContent: e.target.value})} defaultValue={originalContent} autofocus />
            : <Block fs='s' flex innerHTML={content} class='markdown' />
        }
      </Block>
      <Block align='start' mx={30} column={!poll && type === 'choice'} onKeypress={{enter: editing && type === 'choice' && attach('choice')}}>
        {
          map(
            (att, i) => <QuestionAttachment
              showAnswers={showAnswers}
              answerable={answerable}
              actor={activity.actor}
              answer={state.answer}
              focusPrevious={focusPrevious}
              remove={() => onEdit({
                ...object,
                attachments: attachments.filter(({_id}) => _id !== att._id)
            })}
              submit={answer => [
                state.debouncedSubmit(answer),
                local(setAnswer)(answer)
              ]}
              onEdit={newObj => onEdit({
                ...object,
                attachments: attachments.map(att => att._id === newObj._id
                  ? newObj
                  : att)
              })}
              editing={editing}
              object={att}
              poll={poll}
              idx={i} />,
            attachments
          )
        }
        {
          !attachments.length && <QuestionTypeMenu attach={attach} />
        }
      </Block>
      <Block hide={!(editing && type === 'choice' && !poll)}>
        <Button onClick={attach('choice')}>Add Choice</Button>
        <Toggle
          onChange={e => onEdit({...object, randomize: e.target.checked})}
          checked={randomize}
          label='Shuffle choice order' />
      </Block>
    </Block>
  )

  function attach (type, poll) {
    return function * () {
      const id = yield generateObjectId()

      yield onEdit({
        ...object,
        poll: poll === undefined ? object.poll : poll,
        attachments: attachments.concat({
          _id: id,
          objectType: type,
          correctAnswer: []
        })
      })
    }
  }

  // XXX This is a bit of a hack to give focus to the previous
  // choice when deleting
  function focusPrevious (node) {
    let p = node
    while ((p = p.parentNode) && p.className.indexOf('question') === -1)
      ;

    if (p) {
      const inputs = [].slice.call(p.querySelectorAll('input'))
      if (inputs.length) {
        const idx = inputs.indexOf(node)
        setTimeout(() => inputs[idx - 1].focus())
      }
    }
  }
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

  return (
    <Block>
      <Button onClick={attach('choice', true)}>Poll</Button>
      <Button onClick={attach('choice', false)}>Multiple Choice</Button>
      <Button onClick={attach('shortAnswer')}>Short Answer</Button>
      <Button onClick={attach('text')}>Free Response</Button>
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
