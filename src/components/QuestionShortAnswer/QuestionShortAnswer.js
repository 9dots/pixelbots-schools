/**
 * Imports
 */

import LineInput from 'components/LineInput'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <QuestionShortAnswer/>
 */

function render ({props}) {
  const {answerable, showAnswers, object} = props

  return (
    <Block>
      <LineInput defaultValue='Enter your answer...' disabled={!answerable} />
      {
        showAnswers && (
          <Block>
            Correct Answers:
            {
              object.correctAnswer.map(answer => (
                <Block py='xs' px='s' mx display='inline-block' pill bgColor='blue' color='white'>
                  {answer}
                </Block>
              ))
            }
          </Block>
        )
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
