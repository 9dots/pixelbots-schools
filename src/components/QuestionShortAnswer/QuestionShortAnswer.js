/**
 * Imports
 */

import ShortAnswerOverview from './ShortAnswerOverview'
import ShortAnswerEdit from './ShortAnswerEdit'
import {Tooltip, Button} from 'vdux-containers'
import LineInput from 'components/LineInput'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <QuestionShortAnswer/>
 */

function render ({props}) {
  const {
    answerable, showAnswers, answer = [], submit, object, overview, editing, onEdit, focusPrevious
  } = props

  if(overview) return <ShortAnswerOverview {...props} />

  return (
    <Block relative wide>
      {
        editing
          ? <ShortAnswerEdit onEdit={onEdit} object={object} focusPrevious={focusPrevious} />
          : <LineInput
              onInput={e => submit(e.target.value)}
              defaultValue={answer[0] || ''}
              placeholder='Enter your answer...'
              disabled={!answerable}
              fs='s'
              w='30%'
              borderStyle={answerable ? 'solid' : 'dotted'}
              borderColor='grey_medium'
              opacity={1}/>
      }
      {
        showAnswers && (
          <Block>
            {
              object.correctAnswer.filter(Boolean).length
              ? <Block>
                  <Block>
                    Correct Answers:
                  </Block>
                  {
                    object.correctAnswer.map(answer => (
                    <Block lh='18px' px='s' ml='s' display='inline-block' pill bgColor='blue' color='white' fs='12px' fw='normal'>
                      {answer}
                    </Block>
                    ))
                  }
                </Block>
              : <Block mt>No Answers Specified</Block>
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
