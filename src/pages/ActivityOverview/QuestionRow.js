/**
 * Imports
 */
import ActivityQuestion from 'components/ActivityQuestion'
import {questionIcon} from 'lib/activity-helpers'
import {wrap, CSSContainer} from 'vdux-containers'
import {Block, Card, Flex, Icon} from 'vdux-ui'
import Document from 'vdux/Document'
import element from 'vdux/element'


/**
 * QuestionRow
 */

function render ({props}) {
  return (
    <Question  {...props} />
  )
}

const Question = wrap(CSSContainer, {
  hoverProps: {hover: true}
})({
  render ({props}) {
    const {
      question, hover, i,
      expanded, toggle, dismiss
    } = props
    const {displayName, total, numAnswered, points: {max}, poll} = question
    // Prevent division by zero
    const average = Math.round((total / (numAnswered || 1)) * 10) / 10
    const headerProps = {
      highlight: hover || expanded ? .03 : 0,
      boxShadow: expanded ? '0 0 0' : 'card',
      align: 'start center',
      borderBottom: '1px solid off_white',
      p: true
    }

    return (
      <Block>
      <Document onClick={dismiss} />
      <Block m={expanded ? '12px -30px' : 0} boxShadow={expanded ? 'z2' : '0 0 0'} onClick={e => open(e, toggle)}>
        <Flex fs='s' lighter wide pointer>
          <Card {...headerProps} ellipsis flex>
            <Block>{i+1}.</Block>
            <Icon name={questionIcon(question)} fs='s' mx/>
            <Block ellipsis flex>{displayName}</Block>
          </Card>
          <Card {...headerProps} ml={expanded ? 0 : 12} minWidth={138}>
            <Block circle='7' bg={getColor(average / max)} mr='16' hide={poll}/>
            <Block flex>
              {poll ? '–' : average + ' / ' + max}
            </Block>
            <Icon name={`expand_${expanded ? 'less' : 'more'}`}  ml='s' fs='s' />
          </Card>
        </Flex>
        {
          expanded && <Block onClick={e => e.stopPropagation()} bgColor='white' p='18px 50px 30px 50px'><ActivityQuestion overview object={question} /></Block>
        }
      </Block>
      </Block>
    )
  }
})

/**
 * Helpers
 */

function open(e, toggle) {
  e.stopPropagation()
  return toggle()
}

function getColor (average) {
  let color = 'green'
  if(average < .6)
    color = 'red'
  else if(average < .8)
    color = 'yellow'

  return color
}

/**
 * Render
 */

export default {
  render
}