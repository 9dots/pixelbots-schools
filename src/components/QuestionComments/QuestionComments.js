/**
 * Imports
 */

import {Button} from 'vdux-containers'
import Document from 'vdux/Document'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <QuestionComments/>
 */

function render ({props}) {
  const {showComments, commentsId, question, ...rest} = props
  const isShown = commentsId === question.id
  const style = isShown
    ? {
        bgColor: 'grey',
        color: 'white',
        circle: 24,
        mt: 8,
        mr: 2,
        transform: 'rotate(360deg)'
      }
    : {}

  return (
    <Block>
      <Document onClick={() => showComments(null)} />
      <Button
        onClick={e => [e.stopPropagation(), showComments(isShown ? null : question.id)]}
        transition='all .35s'
        align='center center'
        bgColor='#F3F3F3'
        transform='rotate(0)'
        boxShadow='0 1px 3px 0 rgba(0,0,0,0.5)'
        hoverProps={{highlight: 0.03}}
        focusProps={{highlight: 0.03}}
        circle={40}
        color='grey_medium'
        p={0}
        {...style}
        {...rest}>
          <Icon fs={19} name={isShown ? 'chevron_left' : 'chat_bubble'} />
      </Button>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
