/**
 * Imports
 */

import {Tooltip, Button} from 'vdux-containers'
import LineInput from 'components/LineInput'
import mapValues from '@f/map-values'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'
import Form from 'vdux-form'
import map from '@f/map'

/**
 * ShortAnswerEdit
 */

function render ({props}) {
  const {onEdit, object, focusPrevious} = props
  const {correctAnswer} = object

  return (
    <Block mt>
      <Block>
        {
          map((ans, i) => <Answer
            focusPrevious={focusPrevious}
            answer={ans}
            onInput={answer => save(replace(object.correctAnswer, i, answer))
            }
            onEnter={() => save(object.correctAnswer.concat(false))}
            num={correctAnswer.length}
            remove={remove}
            idx={i} />,
            correctAnswer)
        }
      </Block>
      <Block align='start stretch' mt>
        <Button
          hoverProps={{highlight: .03}}
          focusProps={{highlight: .03}}
          borderColor='grey_medium'
          bgColor='white'
          onClick={() => save(object.correctAnswer.concat(false))}
          color='text'
          mr
          px>

          <Icon name='add' fs='s' mr='s' />
          Add Answer
        </Button>
        <Block align='center center'>
          <Tooltip immediate message='Provide all possible solutions to the question.  Student responses must exactly match one of your provided solutions.' tooltipProps={{whiteSpace: 'normal', textAlign: 'center', fs: 'xs', p: 'm', lh: '1.4em'}}>
            <Icon name='info' fs='s' />
          </Tooltip>
        </Block>
      </Block>
    </Block>
  )

  function * save (correctAnswer) {
    yield onEdit({...object, correctAnswer})
  }

  function * remove (idx) {
    correctAnswer.splice(idx, 1)
    yield onEdit({...object, correctAnswer})
  }
}

function Answer({props}) {
  const {answer, idx, remove, focusPrevious, num, onInput, onEnter} = props
  return (
    <Block align='start center' mr flex='30%'>
      <LineInput
        onKeydown={{
          backspace: e => num !== 1 && e.target.value === '' &&
            [remove(idx), idx && focusPrevious(e.target)],
          enter: () => onEnter()
        }}
        onInput={e => onInput(e.target.value)}
        placeholder={'Answer #' + (idx+1)}
        value={answer}
        name={idx}/>
      <Button tabindex='-1' color='text' icon='close' ml onClick={() => remove(idx)} hidden={num === 1} poinerEvents={num === 1 ? 'none' : 'default'}/>
    </Block>
  )
}

/**
 * Helpers
 */

function replace (arr, idx, val) {
  arr = arr.slice()
  arr[idx] = val
  return arr
}

/**
 * Export
 */

export default {
  render
}