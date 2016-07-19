/**
 * Imports
 */

import {Button} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {Icon, Card, Block} from 'vdux-ui'
import Document from 'vdux/Document'
import element from 'vdux/element'
import Comments from './Comments'

/**
 * <QuestionComments/>
 */

function render ({props, local, state}) {
  const {
    showComments, commentsId, question, comments, ...rest
  } = props
  const hasComments = !!comments.length
  const isShown = commentsId === question.id

  return (
    <Block {...rest} question={question} z={2}>
      <CommentButton
        hasComments={hasComments}
        showComments={showComments}
        question={question}
        isShown={isShown} />
      { isShown && <Comments {...props} /> }
    </Block>
  )
}

function CommentButton({props}) {
  const {showComments, question, isShown, hasComments} = props

  const style = isShown
    ? {
        transform: 'rotate(360deg)',
        bgColor: 'grey',
        color: 'white',
        circle: 24,
        left: 5,
        mt: 8
      }
    : {}

  return (
    <Block>
      <Document onClick={() => [showComments(null)]} />
      <Button
        onClick={e => [e.stopPropagation(), showComments(isShown ? null : question.id)]}
        color={hasComments ? 'white' : 'grey_medium'}
        bgColor={hasComments ? 'green' : '#F3F3F3'}
        boxShadow='0 1px 3px 0 rgba(0,0,0,0.5)'
        hoverProps={{highlight: 0.03}}
        focusProps={{highlight: 0.03}}
        transition='all .35s'
        align='center center'
        absolute={{left: -10}}
        transform='rotate(0)'
        circle={40}
        p={0}
        {...style}>
          <Icon fs={19} name={isShown ? 'chevron_left' : 'chat_bubble'} />
      </Button>
    </Block>
  )
}

/**
 * Exports
 */

export default{
  render
}
