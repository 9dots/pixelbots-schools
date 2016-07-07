/**
 * Imports
 */

import QuestionFreeResponse from 'components/QuestionFreeResponse'
import QuestionShortAnswer from 'components/QuestionShortAnswer'
import QuestionPollChoice from 'components/QuestionPollChoice'
import QuestionChoice from 'components/QuestionChoice'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <QuestionAttachment/>
 */

function render ({props}) {
  const {object, poll} = props

  switch (object.objectType) {
    case 'choice':
      return poll
        ? <QuestionPollChoice {...props} />
        : <QuestionChoice {...props} />
    case 'shortAnswer':
      return <QuestionShortAnswer {...props} />
    case 'text':
      return <QuestionFreeResponse {...props} />
  }
}

/**
 * Exports
 */

export default {
  render
}
