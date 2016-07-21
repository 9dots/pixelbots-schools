/**
 * Imports
 */

import {Block} from 'vdux-ui'
import {Tooltip} from 'vdux-containers'
import element from 'vdux/element'

/**
 * Colors
 */

/**
 * <QuestionChoice/>
 */

function render ({props}) {
  const { object, question, bgColor, correctCheck: CorrectCheck } = props
  const {responses, numAnswered, total} = question
  const names = responses
    .filter(r => r.response.indexOf(object._id) !== -1)
    .map(r => r.actor.displayName)
  const percent = Math.round(names.length / numAnswered * 100) + '%'

  return (
    <Tooltip message={names.join('\n')}
      tooltipProps={{whiteSpace: 'pre'}}
      placement='right'
      immediate
      printProps={{bgColor: 'transparent', p: '2px 0 2px 20px'}}
      p='12px 12px 12px 30px'
      align='start center'
      borderRadius='25px'
      bgColor={bgColor}
      relative
      w='70%'
      my='s'>
      { CorrectCheck && <CorrectCheck show={true} /> }
      <Block  fs='s' absolute left={-67} textAlign='left'>
        { percent }
      </Block>
      <Block>
        <Block mx='40px' fs='s' innerHTML={object.content} class='markdown' printProps={{ml: 0}} />
      </Block>
    </Tooltip>
  )
}

/**
 * Exports
 */

export default {
  render
}