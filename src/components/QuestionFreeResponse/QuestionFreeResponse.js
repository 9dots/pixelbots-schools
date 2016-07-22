/**
 * Imports
 */

import FreeResponseOverview from './FreeResponseOverview'
import LineTextarea from 'components/LineTextarea'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <QuestionFreeResponse/>
 */

function render ({props}) {
  const {answerable, editing, answer = [], submit, overview, remove} = props

  if(overview) return <FreeResponseOverview {...props} />

  return (
    <Block flex>
      <LineTextarea
        onInput={e => submit(e.target.value)}
        defaultValue={answer[0] || ''}
        placeholder='Free response...'
        fs='s'
        lh='normal'
        minHeight='40px'
        verticalAlign='top'
        disabled={!answerable} />
        {
          editing && <Button color='black' onClick={remove} icon='delete' />
        }
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
