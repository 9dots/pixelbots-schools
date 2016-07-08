/**
 * Imports
 */

import QuestionAttachment from 'components/QuestionAttachment'
import {Block, Badge} from 'vdux-ui'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <ActivityQuestion/>
 */

function render ({props}) {
  const {object, idx} = props
  const {displayName, poll, attachments = []} = object
  const isMultipleChoice = !poll && attachments[0] && attachments[0].objectType === 'choice'

  return (
    <Block fw='lighter'>
      <Block align='start' py mb>
        <Badge mr pt={3} size={25}>{idx + 1}</Badge>
        <Block fs='s' flex innerHTML={displayName} />
      </Block>
      <Block align='start' mx='36' column={isMultipleChoice}>
        {
          map(
            (object, i) => <QuestionAttachment
              answerable={false}
              showAnswers={true}
              object={object}
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
