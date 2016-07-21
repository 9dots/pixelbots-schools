/**
 * Imports
 */

import QuestionAttachment from 'components/QuestionAttachment'
import element from 'vdux/element'
import getProp from '@f/get-prop'
import {Block} from 'vdux-ui'
import map from '@f/map'

/**
 * <OverviewQuestion/>
 */

function render ({props}) {
  const {object, activity} = props
  const {displayName, poll, attachments = [], points, id, content} = object
  const isMultipleChoice = !poll && getProp('0.objectType', attachments) === 'choice'

  return (
    <Block fw='lighter' relative>
      <Block align='start' py mb>
        <Block fs='s' flex innerHTML={content} class='markdown' />
      </Block>
      <Block align='start' mx={40} column={isMultipleChoice}>
      {
        map(
          (attachment, i) => <QuestionAttachment
            showAnswers={true}
            overview={true}
            question={object}
            object={attachment}
            poll={poll}
            idx={i} />,
          attachments
        )
      }
    </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
