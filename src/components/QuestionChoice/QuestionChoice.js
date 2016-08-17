/**
 * Imports
 */

import {Button, Tooltip, Block as ContBlock} from 'vdux-containers'
import {grey, blue, yellow, green, red} from 'lib/colors'
import TextToSpeech from 'components/TextToSpeech'
import BlockInput from 'components/BlockInput'
import {Block, Icon, Checkbox} from 'vdux-ui'
import ChoiceOverview from './ChoiceOverview'
import Avatar from 'components/Avatar'
import element from 'vdux/element'
import Color from 'Color'

/**
 * Colors
 */

const colors = [
  blue,
  yellow,
  green,
  red,
  Color(grey).lighten(0.6).rgbString()
].map(c => Color(c).lighten(0.3).rgbString())

const printProps = {bgColor: 'transparent', p: '2px 0 2px 20px'}

/**
 * getProps
 */

function getProps (props, context) {
  props.$media = context.uiMedia
  return props
}

/**
 * <QuestionChoice/>
 */

function render ({props}) {
  const {
    object, editing, $media, onEdit, showAnswers, remove,
    focusPrevious, overview, answerable, submit, idx,
    answer = [], actor, numAtt, setSpeaking, speechRate,
    speakingId, speechEnabled
  } = props
  const {content, originalContent, correctAnswer = []} = object
  const isCorrect = correctAnswer.indexOf(object._id) !== -1
  const chosen = isChosen(object, answer)
  const hasAnswer = !!answer.length
  const bgColor = hasAnswer
    ? chosen ? colors[idx % colors.length] : 'grey_light'
    : colors[idx % colors.length]

  if (overview) return <ChoiceOverview correctCheck={isCorrect && CorrectCheck} bgColor={bgColor} {...props} />

  return (
    <Block
      printProps={printProps}
      onClick={answerable && submitAnswer}
      p={editing ? '12px 30px 12px 18px' : '12px 12px 12px 30px'}
      pointer={answerable}
      align='start center'
      borderRadius='25px'
      bgColor={bgColor}
      relative
      w='70%'
      my='s'>
      {!editing && showAnswers && isCorrect && <CorrectCheck />}
      {chosen && <ChosenMarker actor={actor} />}
      {
        $media === 'print' && (
          <Block mr>
            <Checkbox checked={chosen} />
          </Block>
        )
      }
      <Block wide>
        {
          !editing
            ? <Block mx='40px'>
                {
                  speechEnabled &&
                  <TextToSpeech
                    onStart={() => setSpeaking(object._id)}
                    onEnd={() => setSpeaking()}
                    rate={speechRate}
                    text={object.displayName}
                    current={speakingId === object._id}
                    float='left'/>
                }
                <Block key='a' fs='s' innerHTML={content || '<br/>'} class='markdown' printProps={{ml: 0}} />
              </Block>
            : <Block align='start center'>
                <Tooltip message='Mark Correct' mr>
                  <Checkbox
                    onChange={toggleCorrectness}
                    checked={isCorrect}
                    btn={Check}
                    ml='s'/>
                </Tooltip>
                <BlockInput
                  onInput={e => onEdit({...object, originalContent: e.target.value})}
                  inputProps={{p: '4px 12px 5px', fs: 's', fw: 200}}
                  onKeydown={{backspace: e => e.target.value === '' && numAtt > 1 && [remove(), focusPrevious(e.target)]}}
                  placeholder={`Choice ${idx + 1}`}
                  defaultValue={originalContent}
                  lighter
                  my={-6}
                  fs='s'
                  wide/>
                <Button
                  absolute={{right: -24, top: 0, bottom: 0}}
                  onClick={remove}
                  tabindex='-1'
                  icon='close'
                  color='text'
                  my='auto'
                  hide={numAtt === 1}
                  fs='s'/>
              </Block>

        }
      </Block>
    </Block>
  )

  function toggleCorrectness (e) {
    return onEdit({
      ...object,
      correctAnswer: correctAnswer
        .filter(id => id !== object._id)
        .concat(e.target.checked ? object._id : [])
    })
  }

  function * submitAnswer () {
    if (answer.indexOf(object._id) !== -1) {
      yield submit(answer.filter(id => id !== object._id))
    } else {
      yield submit(answer.concat(object._id))
    }
  }
}

function isChosen (obj, answer) {
  answer = [].concat(answer)
  return answer.indexOf(obj._id) !== -1
}

function ChosenMarker ({props}) {
  const {actor} = props

  return (
    <Avatar
      absolute={{left: 8, top: 0, bottom: 0}}
      border='2px solid white'
      boxShadow='0 1px 3px 0 rgba(0,0,0,0.5)'
      actor={actor}
      printProps={{hide: true}}
      size={32}
      m='auto'/>
  )
}

function Check ({props}) {
  const {checked} = props
  const hoverProps = checked ? {} : {highlight: .035}
  return (
    <ContBlock
      border='1px solid'
      borderColor={checked ? 'rgba(white, .7)' : 'grey_medium'}
      bgColor={checked ? 'green' : 'white'}
      align='center center'
      hoverProps={{...hoverProps}}
      rounded
      sq={21}
      pointer
      ml={-6} >
      <Icon hide={!checked} name='check' fs='s' color='white' />
    </ContBlock>
  )
}

function CorrectCheck ({props}) {
  return (
    <Block
      absolute={{left: -18, top: 0, bottom: 0}}
      align='center center'
      bgColor='white'
      boxShadow='0 1px 3px 0 rgba(0,0,0,0.5)'
      color='green'
      circle={32}
      printProps={{boxShadow: '0 0 0', borderRadius: 0}}
      m='auto'>
        <Icon fs='s' name='check' />
    </Block>
  )
}

/**
 * Exports
 */

export default {
  getProps,
  render
}
