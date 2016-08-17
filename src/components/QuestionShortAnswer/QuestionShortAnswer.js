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
    answerable, showAnswers, answer = [], submit, object,
    overview, editing, onEdit, editable
  } = props

  if(overview) return <ShortAnswerOverview {...props} />

  const filterAnswers = object.correctAnswer.filter(Boolean)

  return (
    <Block relative wide>
      {
        editing
          ? <ShortAnswerEdit {...props} />
          : <Block align='start center'>
              <LineInput
                onInput={e => submit(e.target.value)}
                defaultValue={answer[0] || ''}
                placeholder='Enter your answer...'
                disabled={!answerable}
                fs='s'
                w='30%'
                borderStyle={answerable ? 'solid' : 'dotted'}
                borderColor='grey_light'
                opacity={1}/>
                {
                  editable &&
                  <Tooltip ml='s' message='Responses that match any solution from the list below will automatically be marked correct.' tooltipProps={{whiteSpace: 'normal'}} placement='right'>
                    <Icon mt={1} name='help' fs='s' pr />
                  </Tooltip>
                }
            </Block>
      }
      {
        showAnswers && (
          <Block>
            {
              filterAnswers.length
              ? <Block>
                  <Block my='s'>
                    Correct Answers:
                  </Block>
                  <Block align='start center'>
                    {
                      filterAnswers.map(answer => (
                      <Block lh='18px' px='s' mr='s' pill bgColor='blue' color='white' fs='12px' fw='normal'>
                        {answer}
                      </Block>
                      ))
                    }
                  </Block>
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
