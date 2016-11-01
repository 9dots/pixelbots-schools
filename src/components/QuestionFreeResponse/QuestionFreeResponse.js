/**
 * Imports
 */

import FreeResponseOverview from './FreeResponseOverview'
import LineTextarea from 'components/LineTextarea'
import {component, element} from 'vdux'
import {Block} from 'vdux-ui'

/**
 * <QuestionFreeResponse/>
 */

export default component({
  render ({props, actions}) {
    const {answerable, answer = [], overview} = props

    if(overview) return <FreeResponseOverview {...props} />

    return (
      <Block flex relative my>
        <LineTextarea
          onInput={actions.send}
          defaultValue={answer[0] || ''}
          placeholder='Free response...'
          fs='s'
          lh='normal'
          minHeight='40px'
          verticalAlign='top'
          disabled={!answerable}
          borderStyle={answerable ? 'solid' : 'dotted'}
          borderColor='grey_light'
          opacity='1' />
      </Block>
    )
  },

  events: {
    * send ({props}, submit, e) {
      yield props.submit(e.target.value)
    }
  }
})
