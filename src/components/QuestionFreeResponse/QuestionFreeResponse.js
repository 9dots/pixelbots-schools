/**
 * Imports
 */

import FreeResponseOverview from './FreeResponseOverview'
import LineTextarea from 'components/LineTextarea'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <QuestionFreeResponse/>
 */

function render ({props}) {
  const {answerable, answer = [], submit, overview} = props

  if(overview) return <FreeResponseOverview {...props} />

  return (
    <Block flex relative>
      <LineTextarea
        onInput={e => submit(e.target.value)}
        defaultValue={answer[0] || ''}
        placeholder='Free response...'
        fs='s'
        lh='normal'
        minHeight='40px'
        verticalAlign='top'
        disabled={!answerable} />
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
