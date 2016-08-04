/**
 * Imports
 */

import ShortAnswerOverview from './ShortAnswerOverview'
import LineInput from 'components/LineInput'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <QuestionShortAnswer/>
 */

function render ({props}) {
  const {answerable, showAnswers, answer = [], submit, object, overview, editing, remove} = props

  if(overview) return <ShortAnswerOverview {...props} />

  return (
    <Block relative w='30%'>
      <LineInput
        onInput={e => submit(e.target.value)}
        defaultValue={answer[0] || ''}
        placeholder='Enter your answer...'
        disabled={!answerable} />
      {editing && <Button onClick={remove} icon='close' fs='s' absolute right={-24} top bottom m='auto' color='text' />}
      {
        showAnswers && (
          <Block>
            Correct Answers:
            {
              object.correctAnswer.map(answer => (
                <Block lh='18px' px='s' ml='s' display='inline-block' pill bgColor='blue' color='white' fs='12px' fw='normal'>
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
