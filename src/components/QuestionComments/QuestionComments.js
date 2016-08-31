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
  const isShown = commentsId === question._id

  return (
    <Block {...rest} question={question} z={2} printProps={{hide: true}}>
      <CommentButton
        hasComments={hasComments}
        showComments={showComments}
        question={question}
        isShown={isShown} />
      { isShown && <Comments {...props} /> }
    </Block>
  )
}

const highlightStyle = {highlight: 0.03}
const shownCommentStyle = {
  transform: 'rotate(360deg)',
  bgColor: 'grey',
  color: 'white',
  circle: 24,
  left: 5,
  mt: 8
}

function CommentButton ({props}) {
  const {showComments, question, isShown, hasComments} = props

  const style = isShown
    ? shownCommentStyle
    : {}

  return (
    <Block>
      <Button
        onClick={e => [e.stopPropagation(), showComments(isShown ? null : question._id)]}
        color={hasComments ? 'white' : 'grey_medium'}
        bgColor={hasComments ? 'green' : '#F3F3F3'}
        boxShadow='0 1px 3px rgba(0,0,0,0.35)'
        borderWidth={0}
        hoverProps={highlightStyle}
        focusProps={highlightStyle}
        absolute={{left: -10}}
        transition='all .35s'
        align='center center'
        transform='rotate(0)'
        circle={40}
        p={0}
        {...style}>
          <Icon fs={19} name={isShown ? 'chevron_left' : 'chat_bubble'} />
      </Button>
      {isShown && <Document onClick={() => showComments(null)} />}
    </Block>
  )
}

/**
 * Exports
 */

export default{
  render
}
