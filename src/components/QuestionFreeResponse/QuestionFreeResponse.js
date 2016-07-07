/**
 * Imports
 */

import LineTextarea from 'components/LineTextarea'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <QuestionFreeResponse/>
 */

function render ({props}) {
  const {answerable} = props

  return (
    <Block flex>
      <LineTextarea
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
